import React from 'react';
import Link from 'next/link';
import { socials } from "@/constants";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Art-deco divider */}
            <div className="deco-divider max-w-[1400px] mx-auto px-14 max-sm:px-4" style={{ padding: '0' }}>
                <span className="deco-diamond" />
            </div>
            
            <div className="footer-container">
                {/* Left side - Copyright */}
                <div className="footer-copyright">
                    <p>&copy; {currentYear} Mentora. All rights reserved.</p>
                </div>

                {/* Center - Links */}
                <div className="footer-links">
                    <Link href="/privacy" className="footer-link" prefetch={false}>
                        Privacy Policy
                    </Link>
                    <span className="footer-divider">&#x25C6;</span>
                    <Link href="/terms" className="footer-link" prefetch={false}>
                        Terms of Service
                    </Link>
                    <span className="footer-divider">&#x25C6;</span>
                    <Link href="/contact" className="footer-link" prefetch={false}>
                        Contact
                    </Link>
                </div>

                {/* Right side - Social icons */}
                <div className="footer-socials">
                    {socials.map(({ id, url, icon, title }) => (
                        <a
                            key={id}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-icon"
                            aria-label={title}
                        >
                            <Image
                                src={icon}
                                alt={title}
                                width={18}
                                height={18}
                                className="brightness-200 opacity-70"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
