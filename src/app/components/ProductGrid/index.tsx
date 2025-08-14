import ProductCard from '../ProductCard';
import { products } from '../Products';

export default function ProductGrid() {
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </>
  );
}