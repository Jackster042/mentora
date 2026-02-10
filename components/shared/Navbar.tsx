import React, {Fragment} from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/shared/NavItems";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export const Navbar =  () => {
  
    return (
        <Fragment>
        <nav className="navbar">
              <Link href="/" className="group">
      <div className="flex items-center gap-3 cursor-pointer relative">
        <Image src="/images/logo2.png" alt="Logo" width={30} height={20} className="brightness-110" />
        <p className="text-2xl font-display font-bold ml-2 hidden md:block relative" style={{ color: 'var(--text-primary)' }}>
          Mentora
          <span
            className="absolute left-0 bottom-0 w-0 h-[1px] transition-all duration-400 ease-out group-hover:w-full"
            style={{ background: 'var(--accent-gold)' }}
          ></span>
        </p>
      </div>
    </Link>
 
    <div className="flex items-center gap-8">
                <SignedIn>
                    <NavItems />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
  
            
        </nav>
        </Fragment>
    )
}
