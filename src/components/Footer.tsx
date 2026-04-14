"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const shopLinks = [
  ["All Products", "/list?cat=all-products"],
  ["New Arrivals", "/list?cat=all-products"],
  ["Deals", "/list?cat=all-products"],
  ["Featured", "/list?cat=all-products"],
];

const accountLinks = [
  ["My Profile", "/profile"],
  ["My Orders", "/orders"],
  ["Cart", "/cart"],
  ["Login", "/login"],
];

const socialPlatforms = ["facebook", "instagram", "youtube", "pinterest", "x"];
const paymentIcons = ["discover", "skrill", "paypal", "mastercard", "visa"];

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/8 md:border-0">
      {/* Mobile accordion toggle */}
      <button
        className="w-full flex items-center justify-between py-3.5 md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-ink/50">
          {title}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`text-ink/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Desktop heading — always visible */}
      <h3 className="hidden md:block text-xs font-bold uppercase tracking-widest text-ink/40 mb-5">
        {title}
      </h3>

      {/* Links */}
      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out md:!max-h-none md:!opacity-100 space-y-3 ${
          open ? "max-h-56 opacity-100 pb-4" : "max-h-0 opacity-0 md:pb-0"
        }`}
      >
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-ink/60 hover:text-lama transition-colors duration-200 font-medium"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface-muted border-t border-ink/8 mt-20">

      {/* Main grid */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-10">

          {/* ── Brand column ── */}
          <div className="pb-6 md:pb-0 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-2xl font-bold tracking-tight text-ink">
                Zop<span className="text-lama">mart</span>
              </span>
            </Link>
            <p className="text-sm text-ink/55 leading-relaxed mb-5 max-w-[220px]">
              Daily essentials at honest prices. Fast delivery, zero fuss.
            </p>
            <div className="flex gap-2">
              {socialPlatforms.map((platform) => (
                <Link
                  href="#"
                  key={platform}
                  className="w-8 h-8 rounded-full bg-white border border-ink/10 hover:border-lama hover:bg-lama-light flex items-center justify-center transition-all duration-200 shadow-sm"
                >
                  <Image
                    src={`/${platform}.png`}
                    alt={platform}
                    width={13}
                    height={13}
                    className="opacity-40 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Shop column ── */}
          <FooterSection title="Shop" links={shopLinks} />

          {/* ── Account column ── */}
          <FooterSection title="Account" links={accountLinks} />

          {/* ── Contact column ── */}
          <div>
            <div className="border-b border-ink/8 md:border-0">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/40 py-3.5 md:py-0 md:mb-5">
                Contact
              </h3>
            </div>
            <address className="not-italic space-y-2.5 text-sm text-ink/55 mt-3 md:mt-0 font-medium">
              <p>3252 Winding Way, Willowbrook, CA</p>
              <a href="mailto:hello@zopmart.com" className="block hover:text-lama transition-colors">
                hello@zopmart.com
              </a>
              <a href="tel:+12345678900" className="block hover:text-lama transition-colors">
                +1 234 567 890
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-ink/8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-ink/40 font-medium">
          © 2025 Zopmart. All rights reserved.
        </p>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {paymentIcons.map((payment) => (
            <div
              key={payment}
              className="bg-white border border-ink/8 rounded-md px-2 py-1 shadow-sm hover:border-ink/20 transition-colors"
            >
              <Image
                src={`/${payment}.png`}
                alt={payment}
                width={30}
                height={16}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
