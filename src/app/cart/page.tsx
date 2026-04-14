"use client";

import React, { useState } from "react";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { useWixClient } from "@/hooks/useWixClient";

const CartPage = () => {
  const { cart, isLoading, removeItem } = useCartStore();
  const wixClient = useWixClient();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const { checkoutId } =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: "WEB" as any,
        });
      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId },
          callbacks: { postFlowUrl: window.location.origin },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-lama border-t-transparent" />
      </div>
    );
  }

  if (!cart?.lineItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-ink mb-2">Your cart is empty</h2>
        <p className="text-ink-muted text-sm text-center mb-6 max-w-xs">
          Looks like you haven&apos;t added anything yet. Start exploring our
          products!
        </p>
        <Link
          href="/"
          className="bg-lama text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-lama-dark transition-colors shadow-lg shadow-lama/25"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-ink-muted mb-6">
        <Link href="/" className="hover:text-lama transition-colors">
          Home
        </Link>{" "}
        /{" "}
        <span className="text-ink font-medium">Your Cart</span>
      </nav>

      <h1 className="text-2xl font-bold text-ink mb-8">
        Your Cart
        <span className="ml-2 text-sm font-normal text-ink-muted">
          ({cart?.lineItems?.length}{" "}
          {cart?.lineItems?.length === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: item list */}
        <div className="flex-1 space-y-4">
          {cart?.lineItems?.map((item: any) => (
            <div
              key={item._id}
              className="flex gap-4 bg-white rounded-xl p-4 shadow-card border border-surface-muted"
            >
              {item.image && (
                <Image
                  src={wixMedia.getScaledToFillImageUrl(item.image, 80, 100, {})}
                  alt={item.productName?.original || "Product"}
                  width={80}
                  height={100}
                  className="rounded-lg object-cover shrink-0"
                />
              )}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-semibold text-ink text-sm leading-snug">
                    {item.productName?.original}
                  </h3>
                  <p className="text-lama font-bold mt-1 text-sm">
                    ₹{item.price?.amount}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-surface-muted rounded-full px-3 py-1">
                    <span className="text-xs text-ink-muted font-medium">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(wixClient, item._id!)}
                    disabled={isLoading}
                    className="text-xs text-ink-muted hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: order summary */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-xl p-6 shadow-card border border-surface-muted sticky top-24">
            <h2 className="font-bold text-ink text-lg mb-4">Order Summary</h2>

            <div className="bg-lama-light text-lama text-sm font-medium rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2">
              <span>🎉</span>
              <span>You&apos;re saving with Zopmart prices!</span>
            </div>

            <div className="space-y-2 text-sm text-ink-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-ink font-medium">
                  ₹{(cart as any)?.subtotal?.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-accent-green font-medium">FREE</span>
              </div>
            </div>

            <div className="border-t border-surface-muted my-4" />

            <div className="flex justify-between font-bold text-ink text-base mb-6">
              <span>Total</span>
              <span>₹{(cart as any)?.subtotal?.amount}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading || checkingOut}
              className="w-full bg-lama text-white rounded-full py-3.5 font-semibold hover:bg-lama-dark active:scale-95 transition-all duration-200 shadow-lg shadow-lama/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkingOut ? "Redirecting..." : "Proceed to Checkout"}
            </button>

            <Link
              href="/"
              className="block text-center text-sm text-ink-muted hover:text-lama mt-3 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
