"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../providers/CartProvider";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps extends Product {}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isAdded
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}