import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/shared/Navbar";
import { DemoBanner } from "@/components/shared/DemoBanner";

import { ClerkProvider} from "@clerk/nextjs";
import Footer from "@/components/shared/Footer";
import React from "react";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mentora - AI Teaching Platform",
  description: "Learn anything with your personal AI tutor through real-time voice conversations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <html lang="en">
    <ClerkProvider appearance={{ variables: { colorPrimary: "#D4A853" } }}>
        <body className={`${playfair.variable} ${outfit.variable} antialiased`}>
         <DemoBanner />
         <Navbar />
            {children}
         <Footer />
        </body>
    </ClerkProvider>
    </html>

  );
}
