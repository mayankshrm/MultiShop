"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const menuLinks = [
  { href: "/", label: "Homepage" },
  { href: "/list?cat=all-products", label: "All Products" },
  { href: "/list?cat=all-products", label: "Deals" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const pathname = usePathname();
  const isLoggedIn = wixClient.auth.loggedIn();

  const openMenu = () => {
    setVisible(true);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeMenu = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 300);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const handleScroll = () => closeMenu();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [open]);

  const handleLogout = async () => {
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl);
  };

  const allLinks = [
    ...menuLinks,
    ...(isLoggedIn
      ? [
          { href: "/profile", label: "Profile" },
          { href: "#", label: "Logout", onClick: handleLogout },
        ]
      : [{ href: "/login", label: "Login" }]),
    { href: "/cart", label: "Cart" },
  ];

  return (
    <div>
      <button
        onClick={() => (open ? closeMenu() : openMenu())}
        className="p-1 -mr-1 cursor-pointer"
        aria-label="Toggle menu"
      >
        <Image src="/menu.png" alt="" width={28} height={28} />
      </button>

      {visible && (
        <div
          className={`absolute left-0 top-20 w-full z-50 bg-white border-t border-surface-muted shadow-modal
            transition-all duration-300 ease-in-out
            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}
        >
          <nav className="flex flex-col px-6 pt-4 pb-8">
            {allLinks.map((link, i) => (
              <div
                key={link.label}
                className="border-b border-surface-muted last:border-0"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  transition: `opacity 0.3s ease, transform 0.3s ease`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-8px)",
                }}
              >
                {"onClick" in link ? (
                  <button
                    onClick={link.onClick}
                    className="w-full text-left py-4 text-base font-medium text-ink hover:text-lama transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-4 text-base font-medium text-ink hover:text-lama transition-colors duration-200"
                  >
                    {link.label}
                    {link.label === "Deals" && (
                      <span className="ml-2 text-[10px] bg-lama text-white rounded-full px-1.5 py-0.5 font-semibold">
                        HOT
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menu;
