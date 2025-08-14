
import ProductGrid from './components/ProductGrid'; 


export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Our Products</h1>

      <div className="flex flex-wrap gap-4 justify-center">
      <ProductGrid />
      </div>
    </main>
  );
}
