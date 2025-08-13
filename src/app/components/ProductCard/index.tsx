'use client';
import { useCart } from "@/app/providers/CartProvider";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}


export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {

  const {addToCart} = useCart();
  return (
    <div className="border rounded-lg p-4 max-w-xs text-center m-2 shadow-md">
     
     <img src={imageUrl} alt={name} className="w-full aspect-square object-cover mb-4 rounded" />
      
      <h3 className="text-xl font-semibold mb-2">{name}</h3>

      <p className="text-lg text-gray-700 mb-4">${price.toFixed(2)}</p>
      

      <button onClick={() => addToCart({ id, name, price, imageUrl })} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">

        Add to Cart
      </button>
    </div>
  );
}