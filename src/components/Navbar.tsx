"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 transition-shadow duration-300 ${
        scrolled ? "shadow-nav" : "shadow-none"
      }`}
    >
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide font-bold">
            <span className="text-ink">Zop</span>
            <span className="text-lama">mart</span>
          </div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Zopmart" width={24} height={24} />
            <div className="text-2xl tracking-wide font-bold">
              <span className="text-ink">Zop</span>
              <span className="text-lama"> Market</span>
            </div>
          </Link>
          <div className="hidden xl:flex gap-6">
            <Link
              href="/"
              className="relative text-sm font-medium text-ink hover:text-lama transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-lama after:transition-all after:duration-300 hover:after:w-full"
            >
              Homepage
            </Link>
            <Link
              href="/list?cat=all-products"
              prefetch={true}
              className="relative text-sm font-medium text-ink hover:text-lama transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-lama after:transition-all after:duration-300 hover:after:w-full"
            >
              All Products
            </Link>
            <Link
              href="/list?cat=all-products"
              className="relative text-sm font-medium text-ink hover:text-lama transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-lama after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
            >
              Deals
              <span className="text-[10px] bg-lama text-white rounded-full px-1.5 py-0.5 font-semibold leading-none">
                HOT
              </span>
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
