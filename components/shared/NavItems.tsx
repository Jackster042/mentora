"use client";

import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const navItems = [
    {label: "Home", href: "/"},
    {label: "Companions", href: "/companions"},
    {label: "My Journey", href: "/profile"},
]

const NavItems = () => {

   const pathname = usePathname()

    return (
        <nav className="flex items-center gap-6">
            {navItems.map(({label, href}) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "relative py-1 text-sm font-medium transition-colors duration-300",
                        pathname === href
                            ? "text-[var(--accent-gold)] font-semibold"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                >
                    {label}
                    {pathname === href && (
                        <span
                            className="absolute left-0 bottom-0 w-full h-[1px]"
                            style={{
                                background: 'linear-gradient(90deg, var(--accent-gold), transparent)',
                                boxShadow: '0 0 8px rgba(212, 168, 83, 0.3)',
                            }}
                        />
                    )}
                </Link>
            ))}
        </nav>
    )
}
export default NavItems
