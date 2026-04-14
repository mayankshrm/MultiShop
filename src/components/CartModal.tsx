"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";

const CartModal = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-80 sm:w-96 max-h-[80vh] overflow-y-auto absolute rounded-2xl shadow-modal bg-white top-14 right-0 z-20 flex flex-col">
      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="text-4xl mb-3">🛒</div>
          <p className="text-sm font-semibold text-ink">Your cart is empty</p>
          <p className="text-xs text-ink-muted mt-1">Add some items to get started</p>
        </div>
      ) : (
        <>
          {/* Sticky header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-surface-muted sticky top-0 bg-white z-10">
            <h2 className="text-base font-bold text-ink">
              Cart ({cart.lineItems.length})
            </h2>
          </div>

          {/* Item list */}
          <div className="flex flex-col">
            {cart.lineItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 px-5 py-4 hover:bg-surface-soft transition-colors border-b border-surface-muted last:border-0"
              >
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.image, 64, 80, {})}
                    alt={item.productName?.original || "Product"}
                    width={64}
                    height={80}
                    className="object-cover rounded-lg shrink-0"
                  />
                )}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="text-sm font-semibold text-ink leading-snug line-clamp-2">
                      {item.productName?.original}
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {item.availability?.status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      {item.quantity && item.quantity > 1 && (
                        <span className="text-ink-muted">{item.quantity} ×</span>
                      )}
                      <span className="font-bold text-lama">
                        ₹{item.price?.amount}
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

          {/* Sticky footer */}
          <div className="px-5 py-4 sticky bottom-0 bg-white border-t border-surface-muted">
            <div className="flex justify-between text-sm font-semibold text-ink mb-1">
              <span>Subtotal</span>
              <span>₹{(cart as any)?.subtotal?.amount}</span>
            </div>
            <p className="text-xs text-ink-muted mb-3">
              Shipping calculated at checkout
            </p>
            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex-1 text-center rounded-full py-2.5 text-sm font-medium ring-1 ring-surface-muted hover:ring-lama hover:text-lama transition-all duration-200"
              >
                View Cart
              </Link>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="flex-1 rounded-full py-2.5 bg-lama text-white text-sm font-semibold hover:bg-lama-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
