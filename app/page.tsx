import React from "react";

import CompanionCard from "@/components/companion/CompanionCard";
import CompanionList from "@/components/companion/CompanionList";
import { getSubjectColor } from "@/lib/utils";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import Cta from "@/components/companion/CTA";
import { auth } from "@clerk/nextjs/server";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";

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

  // Show dashboard for authenticated users
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className={"home-section"}>
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessionCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
