import React from 'react';
import Link from 'next/link';
import { socials } from "@/constants";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
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
                    <span className="footer-divider" prefetch={false}>•</span>
                    <Link href="/terms" className="footer-link">
                        Terms of Service
                    </Link>
                    <span className="footer-divider" prefetch={false}>•</span>
                    <Link href="/contact" className="footer-link">
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
                                width={20}
                                height={20}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
