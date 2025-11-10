"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author} = await auth()
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.from("companions").insert({...formData, author}).select();

    if(error || !data) throw new Error(error?.message || "Failed to create companion")

    return data[0];

}

export const createFromStarter = async (starterData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    // Create companion from starter template
    const { data, error } = await supabase
        .from("companions")
        .insert({ ...starterData, author })
        .select();

    if (error || !data) throw new Error(error?.message || "Failed to create companion from starter");

    return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%{}subject%`)
      .or(`topic.ilike.%${topic}%,name.ilkee.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error?.message || "Failed to get companions");

  const companionIds = companions.map(({ id }) => id);

  // Get the bookmarks where user_id is the current user and companion_id is in the array of companion IDs
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", userId)
    .in("companion_id", companionIds); // Notice the in() function used to filter the bookmarks by array

  const marks = new Set(bookmarks?.map(({ companion_id }) => companion_id));

  // Add a bookmarked property to each companion
  companions?.forEach((companion) => {
    companion.bookmarked = marks.has(companion.id);
  });

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error?.message || "Failed to get companions");

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  console.log("Attempting to add companion to history:", companionId); // Debug log

  if (!companionId) {
    throw new Error("Invalid companion ID: cannot be undefined or empty");
  }
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  // First verify the companion exists
  const { data: companion, error: companionError } = await supabase
    .from("companions")
    .select("id")
    .eq("id", companionId)
    .single();

  if (companionError || !companion) {
    throw new Error("Companion not found");
  }

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data)
    throw new Error(error?.message || "Failed to get recent sessions");

  // Remove duplicate companions (same companion used in multiple sessions)
  const uniqueCompanions = new Map();
  data.forEach(({ companions }) => {
    if (companions && !uniqueCompanions.has(companions.id)) {
      uniqueCompanions.set(companions.id, companions);
    }
  });

  return Array.from(uniqueCompanions.values());
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data)
    throw new Error(error?.message || "Failed to get recent sessions");

  // Remove duplicate companions (same companion used in multiple sessions)
  const uniqueCompanions = new Map();
  data.forEach(({ companions }) => {
    if (companions && !uniqueCompanions.has(companions.id)) {
      uniqueCompanions.set(companions.id, companions);
    }
  });

  return Array.from(uniqueCompanions.values());
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error || !data)
    throw new Error(error?.message || "Failed to get recent sessions");

  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error?.message || "Failed to get companion count");

  const companionCount = data?.length;

  return companionCount < limit;
};

export const addBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const supabase = createSupabaseClient();

    // First check if bookmark already exists
    const { data: existing } = await supabase
      .from("bookmarks")
      .select()
      .eq("companion_id", companionId)
      .eq("user_id", userId)
      .single();

    if (existing) {
      return { success: true, message: "Already bookmarked" };
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        companion_id: companionId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to add bookmark");
    }

    revalidatePath(path);
    return { success: true, data };
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

export const deleteCompanion = async (companionId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const supabase = createSupabaseClient();
    
    // Delete the companion (only if user is the author)
    const { error } = await supabase
      .from("companions")
      .delete()
      .eq("id", companionId)
      .eq("author", userId);

    if (error) {
      throw new Error(error.message || "Failed to delete companion");
    }

    return { success: true, message: "Companion deleted successfully" };
  } catch (error) {
    console.error("Error deleting companion:", error);
    throw error;
  }
};

export const removeBookmark = async (companionId: string, path: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("companion_id", companionId)
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message || "Failed to remove bookmark");
    }

    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

export const getBookmarkedCompanions = async (userId: string) => {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("bookmarks")
      .select("companions:companion_id (*)")
      .eq("user_id", userId);

    if (error)
      throw new Error(error?.message || "Failed to get recent companions");

    return data.map(({ companions }) => companions);
  } catch (error) {
    console.error("ERROR FETCHING COMPANIONS", error);
    return [];
  }
};
