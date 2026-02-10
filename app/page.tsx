import React from "react";
import Link from "next/link";

import CompanionCard from "@/components/companion/CompanionCard";
import StarterCompanionCard from "@/components/companion/StarterCompanionCard";
import CompanionList from "@/components/companion/CompanionList";
import { getSubjectColor } from "@/lib/utils";
import {
  getAllCompanions,
  getRecentSessions,
  getUserCompanions,
  getUserSessions
} from "@/lib/actions/companion.actions";
import Cta from "@/components/companion/CTA";
import { auth } from "@clerk/nextjs/server";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";
import { starterCompanions } from "@/constants";

const Page = async () => {
  const { userId } = await auth();

  // Show landing page for unauthenticated users
  if (!userId) {
    return (
      <main className="landing-main">
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
    );
  }

  
  const userCompanions = await getUserCompanions(userId);
  const userSessions = await getUserSessions(userId, 10);
  const isNewUser = userCompanions.length === 0;

  // Show starter companions for new users, otherwise show popular companions
  const companions = isNewUser 
    ? starterCompanions 
    : await getAllCompanions({ limit: 3 });

  return (
    <main>
      {isNewUser && (
        <div className="new-user-welcome">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Welcome to Mentora
          </h1>
          <p className="text-lg mt-3" style={{ color: 'var(--text-secondary)' }}>
            Start your learning journey with these starter companions, or{" "}
            <Link href="/companions/new" className="font-semibold hover:underline" style={{ color: 'var(--accent-gold)' }}>
              create your own custom AI tutor
            </Link>
            .
          </p>
        </div>
      )}
      
      {!isNewUser && (
        <div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Popular Companions
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
            Continue the learning with some of the most popular companions, or{" "}
            <Link href="/companions" className="font-semibold hover:underline" style={{ color: 'var(--accent-gold)' }}>
              use some of our best starter companions  
            </Link>
            .
          </p>
        </div>
      )}
      
      <section className="home-section">
        {isNewUser ? (
          // Show starter companions for new users
          companions.map((companion) => (
            <StarterCompanionCard
              key={companion.id}
              name={companion.name}
              topic={companion.topic}
              subject={companion.subject}
              duration={companion.duration}
              voice={companion.voice}
              style={companion.style}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          // Show regular companion cards for existing users
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        )}
      </section>

      <section className="home-section">
        {userSessions.length > 0 ? (
          <CompanionList
            title="Your Recent Sessions"
            companions={userSessions}
            classNames="w-2/3 max-lg:w-full"
          />
        ) : (
          <div className="empty-sessions">
            <div className="empty-sessions-content">
              <div 
                className="text-5xl mb-6 w-20 h-20 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'rgba(212, 168, 83, 0.1)',
                  border: '1px solid rgba(212, 168, 83, 0.2)',
                }}
              >
                🎯
              </div>
              <h3 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Sessions Yet</h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Start a session with a companion to begin your learning journey!
              </p>
              <Link href="/companions">
                <button className="btn-primary">
                  Browse All Companions
                </button>
              </Link>
            </div>
          </div>
        )}
        <Cta />
      </section>
    </main>
  );
};

export default Page;
