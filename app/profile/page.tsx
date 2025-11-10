"use server"

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserCompanions, getUserSessions, getBookmarkedCompanions} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionList from "@/components/companion/CompanionList";
import Footer from "@/components/shared/Footer";

const ProfilePage = async () => {

    const user = await currentUser();
    if(!user) redirect("/sign-in")

    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id);
    const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

    return (
        <main className="min-lg:w-3/4 min-h-[calc(100vh-200px)]">
          <section className="flex items-center justify-between gap-4 max-sm:flex-col">
              {/*left side*/}
              <div className="flex items-center gap-4">

            <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-lg border border-gray-200 dark:border-gray-700"
            />
              <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">
                        {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                      {user.emailAddresses[0]?.emailAddress || "No email provided"}
                  </p>
              </div>
              </div>

          {/*  right side*/}
              <div className="flex gap-4">
                  <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                    <div className="flex items-center gap-2">
                        <Image
                        src="/icons/check.svg"
                        alt="Companion Icon"
                        width={22}
                        height={22}
                        />
                        <p className="text-2xl font-bold">{sessionHistory.length}</p>
                    </div>
                      <div>Lessons Completed</div>
                  </div>
                  <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                    <div className="flex items-center gap-2">
                        <Image
                        src="/icons/cap.svg"
                        alt="Companion Icon"
                        width={22}
                        height={22}
                        />
                        <p className="text-2xl font-bold">{companions.length}</p>
                    </div>
                      <div>Companions Completed</div>
                  </div>
              </div>
          </section>

            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold">
                        Recent Sessions
                    </AccordionTrigger>
                    <AccordionContent>
                        <CompanionList
                        title="Recent Sessions"
                        companions={sessionHistory}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="companions">
                    <AccordionTrigger className="text-2xl font-bold">
                        My Companions{`${companions.length > 0 ? ` (${companions.length})` : ""}`}
                    </AccordionTrigger>
                    <AccordionContent>
                        <CompanionList
                        title="My Companions"
                        companions={companions}
                        showRemoveButton={true}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bookmarks">
                    <AccordionTrigger className="text-2xl font-bold">
                        My Bookmarks{`${bookmarkedCompanions.length > 0 ? ` (${bookmarkedCompanions.length})` : ""}`}
                    </AccordionTrigger>
                    <AccordionContent>
                        <CompanionList
                            title="My Companions"
                            companions={bookmarkedCompanions}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    )
}
export default ProfilePage
