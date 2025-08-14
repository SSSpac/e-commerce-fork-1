'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/providers/CartProvider';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, clearCart } = useCart();


  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)} className="relative inline-flex flex-col items-center" 
        aria-label="Open cart">

      <div className="relative inline-block">
        <ShoppingBagIcon className="h-7 w-7 text-black hover:text-gray-400 cursor-pointer" />

        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] leading-none rounded-full px-1.5 py-0.5">
            {cartItems.length}
          </span>
        )}
        </div>

        {total > 0 && (
          <span className="mt-1 text-xs font-semibold text-black">
            ${total.toFixed(2)}
          </span>
        )}
        
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 right-[0rem] h-full w-80 bg-white shadow-xl transform transition-transform duration-300 flex flex-col z-20
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog" aria-label="Cart sidebar"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-black">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl leading-none hover:opacity-70"
            aria-label="Close sidebar">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cartItems.length === 0 ? (
            <p className="text-sm text-black">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, idx) => (
                <li
                  key={`${item.name}-${idx}`}
                  className="flex items-center justify-between border rounded p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">{item.name}</p>
                      <p className="text-sm text-black">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-sm bg-black text-white px-3 py-1 rounded hover:opacity-90 transition cursor-pointer"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-black">Total</span>
            <span className="font-semibold ">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
          
            <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:opacity-90 transition cursor-pointer">
              Checkout
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
