import ProductCard from './components/ProductCard';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Our Products</h1>

      <div className="flex flex-wrap gap-4 justify-center">
        <ProductCard 
          name="The Urban Explorer" 
          price={95.00} 
          imageUrl="/images/backpack1.png" 
        />
        <ProductCard 
          name="The Weekender" 
          price={110.00} 
          imageUrl="/images/backpack2.png" 
        />
        <ProductCard 
          name="The Trailblazer" 
          price={135.50} 
          imageUrl="/images/backpack3.png" 
        />
        <ProductCard 
          name="The Minimalist" 
          price={79.99} 
          imageUrl="/images/backpack4.png" 
        />
                <ProductCard 
          name="Sneaker Pro" 
          price={120.00} 
          imageUrl="/images/shoe1.png" 
        />
        <ProductCard 
          name="Classic Sneaker" 
          price={155.00} 
          imageUrl="/images/shoe2.png" 
        />
        <ProductCard 
          name="Space Speedsters" 
          price={189.99} 
          imageUrl="/images/shoe3.png" 
        />
        <ProductCard 
          name="Air Gordons" 
          price={85.00} 
          imageUrl="/images/shoe4.png" 
        />
      </div>
    </main>
  );
}