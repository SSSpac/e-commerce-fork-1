import ProductCard from './components/ProductCard'; // Adjust path if needed

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

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
      </div>
    </main>
  );
}