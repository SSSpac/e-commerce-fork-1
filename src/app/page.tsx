import ProductCard from './components/ProductCard';

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      <div className="flex">
        <ProductCard />
      </div>
    </main>
  );
}