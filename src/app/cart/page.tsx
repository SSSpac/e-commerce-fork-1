'use client';

import { useCart } from '@/app/providers/CartProvider';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <li key={`${item.name}-${idx}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total: ${total.toFixed(2)}</span>
            <button onClick={clearCart} className="bg-gray-800 text-white px-4 py-2 rounded">
              Clear cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
