export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sneaker Pro",
    price: 129.99,
    imageUrl: "/images/sneaker-pro.jpg",
    category: "shoes"
  },
  {
    id: 2,
    name: "Classic Hoodie",
    price: 59.99,
    imageUrl: "/images/classic-hoodie.jpg",
    category: "clothing"
  },
  {
    id: 3,
    name: "Denim Shirt",
    price: 49.99,
    imageUrl: "/images/denim-shirt.jpg",
    category: "clothing"
  },
  {
    id: 4,
    name: "Running Shorts",
    price: 34.99,
    imageUrl: "/images/running-shorts.jpg",
    category: "clothing"
  },
  {
    id: 5,
    name: "Premium Watch",
    price: 199.99,
    imageUrl: "/images/premium-watch.jpg",
    category: "accessories"
  },
  {
    id: 6,
    name: "Backpack Pro",
    price: 89.99,
    imageUrl: "/images/backpack-pro.jpg",
    category: "accessories"
  },
  {
    id: 7,
    name: "Sports Cap",
    price: 24.99,
    imageUrl: "/images/sports-cap.jpg",
    category: "accessories"
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 39.99,
    imageUrl: "/images/yoga-mat.jpg",
    category: "fitness"
  },
  {
    id: 9,
    name: "Water Bottle",
    price: 19.99,
    imageUrl: "/images/water-bottle.jpg",
    category: "accessories"
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    price: 79.99,
    imageUrl: "/images/wireless-earbuds.jpg",
    category: "electronics"
  },
  {
    id: 11,
    name: "Gym Gloves",
    price: 29.99,
    imageUrl: "/images/gym-gloves.jpg",
    category: "fitness"
  },
  {
    id: 12,
    name: "Casual Sneakers",
    price: 89.99,
    imageUrl: "/images/casual-sneakers.jpg",
    category: "shoes"
  }
];