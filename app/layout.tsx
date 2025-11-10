import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/shared/Navbar";

import { ClerkProvider} from "@clerk/nextjs";
import Footer from "@/components/shared/Footer";
import React from "react";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
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
    <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
        <body className={`${bricolage.variable} antialiased`}>
         <Navbar />
            {children}
         <Footer />
        </body>
    </ClerkProvider>
    </html>

  );
}
