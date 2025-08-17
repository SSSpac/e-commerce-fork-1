import { products } from '../../src/app/components/Products';

describe('Product Data', () => {

  
  test('should not have duplicate IDs', () => { 
    const ids = products.map(product => product.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length); 
    });


  test('should have a name for each product', () => {
    products.forEach(product => {
    expect(product.name).toBeDefined();
    expect(product.name).not.toBe('');
  });
    });


  test('should have a price for each product', () => {
    products.forEach(product => {
    expect(product.price).toBeDefined();
    expect(typeof product.price).toBe('number');
    expect(product.price).toBeGreaterThan(0);
    });
  });

  
  test('should have an image URL for each product', () => {
    products.forEach(product => {
    expect(product.imageUrl).toBeDefined();
    expect(product.imageUrl).toMatch(/^\/.*(\.png|\.webp|\.jpeg|\.jpg)$/); // Basic URL validation
    });
  });
});
