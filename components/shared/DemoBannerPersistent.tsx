"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const DemoBannerPersistent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
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

  // Avoid hydration mismatch
  if (!isLoaded || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              🎨 DEMO MODE
            </span>
            <p className="text-sm md:text-base font-medium">
              <span className="font-bold">Portfolio Demonstration:</span> This is
              a showcase project. All features, purchases, and subscriptions are
              simulated for demonstration purposes only.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-auto flex-shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
