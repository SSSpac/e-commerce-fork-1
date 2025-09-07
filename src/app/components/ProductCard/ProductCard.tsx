"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../Providers/CartProvider";
import { Product } from "@/app/data/page";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, imageUrl } = product; 
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
        className="w-full h-50 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-2xl font-bold text-green-400 mb-3">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isAdded
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-red-400 hover:bg-blue-700"
          }`}
        >
          {isAdded ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}