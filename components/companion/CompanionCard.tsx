"use client";

import React, { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {removeBookmark, addBookmark} from "@/lib/actions/companion.actions";

type CompanionComponentProps = {
   id: string,
    name: string,
    topic: string,
    subject: string,
    duration: number,
    color: string
    bookmarked: boolean,
}

const CompanionCard = ({
    id,name,topic,subject,duration,color,bookmarked
                       } : CompanionComponentProps) => {

    const [ isBookmarked, setIsBookmarked ] = useState<boolean>(bookmarked);
    const pathname = usePathname();

    const handleBookmark = async () => {
        try {
            if (isBookmarked) {
                await removeBookmark(id, pathname);
            } else {
                await addBookmark(id, pathname);
            }
            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error("Error updating bookmark:", error);
        }
    };

    return (
        <article 
            className="companion-card"
            style={{ 
                // Use the subject color as the left accent bar
                '--card-accent': color,
            } as React.CSSProperties}
        >
            {/* Subject color accent bar override */}
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
                <button className="companion-bookmark" onClick={handleBookmark}>
                    <Image
                        src={
                            isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
                        }
                        alt="bookmark"
                        width={12.5}
                        height={15}
                        className="brightness-200"
                    />
                </button>
            </div>

            <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>{name}</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{topic}</p>
            <div className="flex items-center gap-2">
                <Image
                    src="/icons/clock.svg"
                    alt="duration"
                    width={13.5}
                    height={13.5}
                    className="brightness-200 opacity-60"
                />
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{duration} minutes</p>
            </div>

            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard;
