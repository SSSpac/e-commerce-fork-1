import { renderHook, act } from '@testing-library/react';
import CartProvider, { useCart } from '../../src/app/components/providers/CartProvider';

describe('useCart Hook Logic', () => {

  test('should add a product and update the total', () => {

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });
    
    const productToAdd = { id: 1, name: "Test Product", price: 50, imageUrl: "test.png" };

    act(() => {
      result.current.addToCart(productToAdd);
    });

    expect(result.current.itemCount).toBe(1);
    expect(result.current.cartTotal).toBe(50);
  });

});