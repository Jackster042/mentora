"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const DemoBannerPersistent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("demo-banner-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
    setIsLoaded(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("demo-banner-dismissed", "true");
  };

  if (!isLoaded || !isVisible) return null;

  return (
    <div
      className="relative"
      style={{
        background: 'linear-gradient(90deg, var(--bg-surface), var(--bg-elevated), var(--bg-surface))',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wider"
              style={{
                background: 'rgba(212, 168, 83, 0.12)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(212, 168, 83, 0.25)',
              }}
            >
              DEMO
            </span>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Portfolio Demonstration</span>
              {" "}&mdash; features and subscriptions are simulated for demo purposes.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-auto flex-shrink-0 rounded-full p-1 transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
