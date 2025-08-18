import { products } from '../../src/app/components/Products';

describe('Products Tests', () => {
  test('has unique IDs', () => { 
    const ids = products.map(product => product.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length); 
  });

  test('all have names', () => {
    products.forEach(product => {
      expect(product.name).toBeDefined();
      expect(product.name).not.toBe('');
    });
  });

  test('all have prices', () => {
    products.forEach(product => {
      expect(product.price).toBeDefined();
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test('all have images', () => {
    products.forEach(product => {
      expect(product.imageUrl).toBeDefined();
      expect(product.imageUrl).toMatch(/\.(png|webp|jpeg|jpg)$/);
    });
  });

  test('has many products', () => {
    expect(products.length).toBeGreaterThan(10);
  });

  test('prices are reasonable', () => {
    products.forEach(product => {
      expect(product.price).toBeLessThan(500);
    });
  });
});