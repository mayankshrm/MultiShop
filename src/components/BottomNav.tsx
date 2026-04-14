"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/hooks/useCartStore";

const HomeIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={filled ? "2" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"
      fill={filled ? "currentColor" : "none"} fillOpacity={filled ? "0.12" : "0"} />
    <path d="M9 21V12h6v9" />
  </svg>
);

const ShopIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={filled ? "2" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
      fill={filled ? "currentColor" : "none"} fillOpacity={filled ? "0.12" : "0"} />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={filled ? "2" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
    <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
      fill={filled ? "currentColor" : "none"} fillOpacity={filled ? "0.12" : "0"} />
  </svg>
);

const AccountIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={filled ? "2" : "1.75"} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"
      fill={filled ? "currentColor" : "none"} fillOpacity={filled ? "0.12" : "0"} />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const links = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/list?cat=all-products", label: "Shop", Icon: ShopIcon },
  { href: "/cart", label: "Cart", Icon: CartIcon, showBadge: true },
  { href: "/profile", label: "Account", Icon: AccountIcon },
];

const BottomNav = () => {
  const pathname = usePathname();
  const { counter } = useCartStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-surface-muted">
      <div className="flex items-center justify-around px-2 py-1.5">
        {links.map(({ href, label, Icon, showBadge }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href.split("?")[0]);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-4 py-1 relative min-w-[56px]"
            >
              <span className={`transition-colors duration-200 ${isActive ? "text-lama" : "text-ink/35"}`}>
                <Icon filled={isActive} />
              </span>

              {showBadge && counter > 0 && (
                <span className="absolute top-0.5 right-2.5 min-w-[16px] h-4 bg-lama text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {counter}
                </span>
              )}

              <span className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                isActive ? "text-lama" : "text-ink/35"
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
