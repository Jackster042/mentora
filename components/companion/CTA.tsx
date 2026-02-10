import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way</div>
            <h2 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                Build a Personalized Learning Companion
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>
            <Image
                src="/images/cta.svg"
                alt="cta"
                width={362}
                height={232}
                className="brightness-90 opacity-80"
            />
            <Link href="/companions/new">
                <button className="btn-primary">
                    <Image
                        src="/icons/plus.svg"
                        alt="plus"
                        width={12}
                        height={12}
                        className="brightness-0"
                    />
                    Build a New Companion
                </button>
            </Link>
        </section>
    )
}

export default Cta;
