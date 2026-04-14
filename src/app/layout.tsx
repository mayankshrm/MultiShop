import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { WixClientContextProvider } from "@/context/wixContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Zopmart — Daily Essentials for Less",
  description: "Shop groceries, home goods and daily essentials at the best prices, delivered fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-surface-soft min-h-screen`}>
        <WixClientContextProvider>
          <Navbar />
          <main className="pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
