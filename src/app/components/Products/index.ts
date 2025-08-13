export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  // Backpacks
  { id: 1, name: "The Urban Explorer", price: 95.00, imageUrl: "/images/backpack1.png", category: "backpacks" },
  { id: 2, name: "The Weekender", price: 110.00, imageUrl: "/images/backpack2.png", category: "backpacks" },
  { id: 3, name: "The Trailblazer", price: 135.50, imageUrl: "/images/backpack3.png", category: "backpacks" },
  { id: 4, name: "The Minimalist", price: 79.99, imageUrl: "/images/backpack4.png", category: "backpacks" },
  
  // Shoes
  { id: 5, name: "Sneaker Pro", price: 120.00, imageUrl: "/images/shoe1.png", category: "shoes" },
  { id: 6, name: "Classic Sneaker", price: 155.00, imageUrl: "/images/shoe2.png", category: "shoes" },
  { id: 7, name: "Space Speedsters", price: 189.99, imageUrl: "/images/shoe3.png", category: "shoes" },
  { id: 8, name: "Air Gordons", price: 85.00, imageUrl: "/images/shoe4.png", category: "shoes" },
  
  // T-Shirts
  { id: 9, name: "Classic Tee", price: 29.99, imageUrl: "/images/t-shirt1.png", category: "t-shirts" },
  { id: 10, name: "Graphic Tee", price: 34.99, imageUrl: "/images/t-shirt2.png", category: "t-shirts" },
  { id: 11, name: "Premium Cotton Tee", price: 39.99, imageUrl: "/images/t-shirt3.png", category: "t-shirts" },
  { id: 12, name: "Vintage Tee", price: 32.50, imageUrl: "/images/t-shirt4.png", category: "t-shirts" },
  { id: 13, name: "Sport Performance Tee", price: 44.99, imageUrl: "/images/t-shirt5.png", category: "t-shirts" },
  
  // Pants
  { id: 14, name: "Slim Fit Jeans", price: 89.99, imageUrl: "/images/pants1.png", category: "pants" },
  { id: 15, name: "Cargo Pants", price: 79.99, imageUrl: "/images/pants2.png", category: "pants" },
  { id: 16, name: "Chino Trousers", price: 69.99, imageUrl: "/images/pants3.png", category: "pants" },
  { id: 17, name: "Jogger Pants", price: 59.99, imageUrl: "/images/pants4.png", category: "pants" },
  
  // Hoodies
  { id: 18, name: "Classic Hoodie", price: 64.99, imageUrl: "/images/hoodie1.png", category: "hoodies" },
  { id: 19, name: "Zip-Up Hoodie", price: 74.99, imageUrl: "/images/hoodie2.png", category: "hoodies" },
  { id: 20, name: "Oversized Hoodie", price: 69.99, imageUrl: "/images/hoodie3.png", category: "hoodies" },
  { id: 21, name: "Tech Fleece Hoodie", price: 94.99, imageUrl: "/images/hoodie4.png", category: "hoodies" },
  
  // Caps
  { id: 22, name: "Baseball Cap", price: 24.99, imageUrl: "/images/cap1.png", category: "caps" },
  { id: 23, name: "Snapback Cap", price: 29.99, imageUrl: "/images/cap2.png", category: "caps" },
  { id: 24, name: "Dad Cap", price: 22.99, imageUrl: "/images/cap3.png", category: "caps" },
  { id: 25, name: "Trucker Cap", price: 27.99, imageUrl: "/images/cap4.png", category: "caps" },
  
  // Shirts
  { id: 27, name: "Linen Shirt", price: 49.99, imageUrl: "/images/shirt2.png", category: "shirts" },
  { id: 28, name: "Flannel Shirt", price: 59.99, imageUrl: "/images/shirt3.png", category: "shirts" },
  { id: 29, name: "Denim Shirt", price: 64.99, imageUrl: "/images/shirt4.webp", category: "shirts" },
];