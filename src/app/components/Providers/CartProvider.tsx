'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';




export type CartItem = { id: number; name: string; price: number; imageUrl: string; qty: number };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  increment: (name: string) => void;
  decrement: (name: string) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;


  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


  function addToCart(item: Omit<CartItem, 'qty'>) {
    setCartItems(prev => {
      const idx = prev.findIndex(p => p.name === item.name);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  }
  const increment = (name: string) =>
    setCartItems(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i));
  const decrement = (name: string) =>
    setCartItems(prev => prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0));
  const removeFromCart = (name: string) =>
    setCartItems(prev => prev.filter(i => i.name !== name));
  const clearCart = () => setCartItems([]);

  const itemCount = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.qty, 0), [cartItems]);

 
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(v => !v);

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart, increment, decrement, removeFromCart, clearCart,
        itemCount, cartTotal,
        isCartOpen, openCart, closeCart, toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}