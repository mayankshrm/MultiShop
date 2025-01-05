"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const pathname = usePathname();
  const isLoggedIn = wixClient.auth.loggedIn();


  useEffect(() => {
    // Close the sidebar when the route changes
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const handleScroll = () => setOpen(false);
      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open]);

  const handleLogout = async () => {
   
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    
    
    router.push(logoutUrl);
  };

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black z-50 text-white left-0 top-20 w-full  h-[calc(100vh-80px)]  flex flex-col items-center justify-center gap-8 text-xl ">
          <Link href="/">Homepage</Link>
          <Link href="/list?cat=all-products">All Products</Link>
          {/* <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link> */}
          {isLoggedIn ? (
            <>
               <Link href="/profile">Profile</Link>
              <div onClick={handleLogout}>Logout</div>
            </>
          ):(
            <Link href="/login">Login</Link>
          )}
          <Link href="/cart">Cart</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
