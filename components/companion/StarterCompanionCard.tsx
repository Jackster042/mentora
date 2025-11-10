"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createFromStarter } from "@/lib/actions/companion.actions";

type StarterCompanionCardProps = {
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  voice: string;
  style: string;
};

const StarterCompanionCard = ({
  name,
  topic,
  subject,
  duration,
  color,
  voice,
  style,
}: StarterCompanionCardProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleLaunchLesson = async () => {
    try {
      setIsCreating(true);

      // Create the companion from starter template
      const companion = await createFromStarter({
        name,
        topic,
        subject,
        duration,
        voice,
        style,
      });

      // Redirect to the newly created companion session
      router.push(`/companions/${companion.id}`);
    } catch (error) {
      console.error("Error creating starter companion:", error);
      setIsCreating(false);
    }
  };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <div className="companion-bookmark opacity-50 cursor-not-allowed">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <button
        className="btn-primary w-full justify-center"
        onClick={handleLaunchLesson}
        disabled={isCreating}
      >
        {isCreating ? (
          <>
            <span className="animate-spin">⏳</span>
            Creating...
          </>
        ) : (
          "Launch Lesson"
        )}
      </button>
    </article>
  );
};

export default StarterCompanionCard;
