import CompanionForm from "@/components/companion/CompanionForm";

import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import Image from "next/image";
import {newCompanionPermissions, getDemoUsageStats} from "@/lib/actions/companion.actions";
import Link from "next/link";

const NewCompanion = async () => {

    const { userId } = await auth()
    if(!userId) redirect("/sign-in")

    const canCreateCompanion = await newCompanionPermissions()
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    const demoStats = isDemoMode ? await getDemoUsageStats(userId) : null

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateCompanion ? (
            <article className="w-full gap-4 flex flex-col">
                <h1>Companion Builder</h1>

                {isDemoMode && demoStats && (
                    <div 
                        className="rounded-2xl p-4 flex items-center gap-3"
                        style={{
                            background: 'rgba(212, 168, 83, 0.08)',
                            border: '1px solid rgba(212, 168, 83, 0.2)',
                        }}
                    >
                        <span className="text-3xl">🎨</span>
                        <div className="flex-1">
                            <p className="font-semibold" style={{ color: 'var(--accent-gold)' }}>
                                Demo Mode: {demoStats.companionsUsed} / {demoStats.maxCompanions} Companions Created
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Each companion can be used for up to 3 demo sessions
                            </p>
                        </div>
                    </div>
                )}

               <CompanionForm />
            </article>

            ) : (
                <article className="companion-limit w-fit">
                    <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} className="brightness-90 opacity-80" />
                    <div className="cta-badge">
                        {isDemoMode ? "Demo Limit Reached" : "Upgrade your plan"}
                    </div>
                    <h1>You&apos;ve Reached Your Limit</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {isDemoMode 
                            ? `You've created ${demoStats?.companionsUsed || 0} of ${demoStats?.maxCompanions || 3} demo companions. Explore your existing companions or try ones from the community!`
                            : "You've reached your companion limit. Upgrade to create more companions and access premium features."
                        }
                    </p>
                    <div className="flex gap-4 w-full max-md:flex-col">
                        <Link href="/companions" className="btn-primary w-full justify-center">
                            Browse Companions
                        </Link>
                        {!isDemoMode && (
                            <Link href="/subscription" className="btn-primary w-full justify-center">
                                Upgrade My Plan
                            </Link>
                        )}
                    </div>
                </article>
            )}
        </main>
    )
}
export default NewCompanion
