"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FirstPopUp = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const SIX_HOURS = 6 * 60 * 60 * 1000;

    if (isMobile) {
      const lastVisit = localStorage.getItem("lastVisit");
      const now = Date.now();

      if (!lastVisit || now - parseInt(lastVisit) > SIX_HOURS) {
        setShowPopup(true);
        localStorage.setItem("lastVisit", now.toString());
      }
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fade-in"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-white rounded-3xl p-7 w-[90%] max-w-xs shadow-modal border border-lama/10 relative animate-slide-up-fade"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-4 text-2xl font-bold text-lama hover:text-lama-dark transition-colors cursor-pointer leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-2xl font-bold text-ink">Hey There! 👋</p>
          <span className="bg-lama text-white px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            SPECIAL OFFER
          </span>
          <p className="text-4xl font-bold text-lama">70% OFF</p>
          <p className="text-sm font-medium text-ink-muted">
            First-Time Customer Exclusive
          </p>
          <Link
            href="/list?cat=all-products"
            onClick={() => setShowPopup(false)}
            className="mt-2 w-full max-w-[220px] bg-lama text-white rounded-full py-3.5 px-7 text-sm font-semibold hover:bg-lama-dark hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg shadow-lama/20 text-center"
          >
            Claim Your Discount
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPopUp;
