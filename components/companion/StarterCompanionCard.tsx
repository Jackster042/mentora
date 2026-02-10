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

      const companion = await createFromStarter({
        name,
        topic,
        subject,
        duration,
        voice,
        style,
      });

      router.push(`/companions/${companion.id}`);
    } catch (error) {
      console.error("Error creating starter companion:", error);
      setIsCreating(false);
    }
  };

  return (
    <article 
      className="companion-card"
      style={{ 
        '--card-accent': color,
      } as React.CSSProperties}
    >
      {/* Subject color accent bar */}
      <div 
        className="absolute top-0 left-0 w-[3px] h-full rounded-l-2xl"
        style={{ background: color, opacity: 0.7 }}
      />
      
      <div className="flex justify-between items-center">
        <div 
          className="subject-badge"
          style={{ 
            background: `${color}15`,
            color: color,
            borderColor: `${color}40`,
          }}
        >
          {subject}
        </div>
        <div 
          className="companion-bookmark opacity-30 cursor-not-allowed"
        >
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={12.5}
            height={15}
            className="brightness-200"
          />
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>{name}</h2>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{topic}</p>
      <div className="flex items-center gap-2">
        <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} className="brightness-200 opacity-60" />
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{duration} minutes</p>
      </div>

      <button
        className="btn-primary w-full justify-center"
        onClick={handleLaunchLesson}
        disabled={isCreating}
      >
        {isCreating ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
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
