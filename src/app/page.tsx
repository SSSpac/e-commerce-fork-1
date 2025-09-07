import ProductGrid from './components/ProductGrid/ProductGrid'; 


export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Our Product</h1>

      <div className="flex flex-wrap gap-4 justify-center">
      <ProductGrid />
      </div>
    </main>
  );
}
