"use client";

import { useState } from "react";
import { useCart } from "../providers/CartProvider"; 
import Link from "next/link";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, clearCart, total } = useCart();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="Open cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
        <span className="block text-xs font-semibold mt-1">${total.toFixed(2)}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4">
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto h-96">
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center space-x-3">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-green-600">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total: ${total.toFixed(2)}</span>
                  <button onClick={clearCart} className="text-red-500 text-sm">
                    Clear Cart
                  </button>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block text-center"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}