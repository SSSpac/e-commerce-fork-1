'use client';
import { useCart } from "@/app/components/providers/CartProvider";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="border rounded-lg p-4 max-w-xs text-center m-2 shadow-md">
      <img
        src={imageUrl}
        alt={name}
        className="w-full aspect-square object-cover mb-4 rounded"
      />

      <h3 className="text-xl font-semibold mb-2 text-black">{name}</h3>

      <p className="text-lg text-gray-700 mb-4">${price.toFixed(2)}</p>

      <button
        onClick={handleAddToCart}
        className={`py-2 px-4 rounded transition-colors duration-300 ${added ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}>
        {added ? "Added!" : "Add to Cart"}
      </button>

    </div>
  );
}
