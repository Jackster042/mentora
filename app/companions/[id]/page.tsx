import React from 'react'
import {getCompanion, canStartDemoSession} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/companion/CompanionComponent";
import Link from "next/link";

interface CompanionSessionPageProps {
    params: Promise<{id:string}>
}

const CompanionSession = async ({params} : CompanionSessionPageProps) => {

    const { id } = await params
    const companion = await getCompanion(id)
    const user = await currentUser()

    const {name, subject, title, topic, duration} = companion

    if(!user) redirect("/sign-in")
    if(!name) redirect("/companions")

    // Check session limits in demo mode
    const sessionCheck = await canStartDemoSession(id, user.id)
    const isSessionLimitReached = !sessionCheck.allowed

    const subjectColor = getSubjectColor(subject);

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-3">
                    <div 
                        className="size-[72px] flex items-center justify-center rounded-xl max-md:hidden"
                        style={{ 
                            backgroundColor: `${subjectColor}15`,
                            border: `1px solid ${subjectColor}30`,
                        }}
                    >
                        <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={35}
                            height={35}
                            className="brightness-110"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                                {name}
                            </p>
                            <div 
                                className="subject-badge max-md:hidden"
                                style={{
                                    background: `${subjectColor}15`,
                                    color: subjectColor,
                                    borderColor: `${subjectColor}40`,
                                }}
                            >
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden" style={{ color: 'var(--text-secondary)' }}>
                    {duration} minutes
                </div>
            </article>

            {isSessionLimitReached && process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
                <article className="companion-limit w-full my-6">
                    <Image src="/images/limit.svg" alt="Session limit reached" width={360} height={230} className="brightness-90 opacity-80" />
                    <div className="cta-badge">
                        Demo Limit Reached
                    </div>
                    <h1>Session Limit for This Companion</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        You&apos;ve used {sessionCheck.sessionsUsed} of {sessionCheck.maxSessions} demo sessions with this companion.
                        Try one of your other companions or explore more from the library!
                    </p>
                    <div className="flex gap-4 w-full max-md:flex-col">
                        <Link href="/companions" className="btn-primary w-full justify-center">
                            Browse Companions
                        </Link>
                        <Link 
                            href="/profile" 
                            className="btn-primary w-full justify-center"
                            style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-medium)' }}
                        >
                            My Companions
                        </Link>
                    </div>
                </article>
            )}

            {!isSessionLimitReached && (
                <CompanionComponent
                    {...companion}
                    companionId={id}
                    userName={user.firstName!}
                    userImage={user.imageUrl!}
                />
            )}
        </main>
    )
}
export default CompanionSession
