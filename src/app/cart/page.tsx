"use client"

import React from 'react';
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/hooks/useCartStore";
import Image from 'next/image';
import { useWixClient } from "@/hooks/useWixClient";


const CartPage = () => {
    const { cart, isLoading, removeItem } = useCartStore();
    const wixClient = useWixClient();
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!cart?.lineItems?.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 text-center mb-6">Looks like you have not added anything to your cart yet</p>
                <Link 
                    href="/" 
                    className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Cart</h1>
            
            <div className="space-y-4 mb-6">
                {cart?.lineItems?.map((item: any) => (
                    <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                        {item.image && (
                            <Image
                                src={wixMedia.getScaledToFillImageUrl(
                                    item.image,
                                    72,
                                    96,
                                    {}
                                )}
                                alt=""
                                width={72}
                                height={96}
                                className="object-cover rounded-md"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-medium">{item.productName?.original}</h3>
                            <p className="text-gray-600">${item.price?.amount}</p>
                            <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${(cart as any)?.subtotal?.amount}</span>
                </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md mb-4">
                Checkout
            </button>
        </div>
    );
};

export default CartPage;