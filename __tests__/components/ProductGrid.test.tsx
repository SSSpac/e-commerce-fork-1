import { render, screen } from '@testing-library/react';
import { products } from '../../src/app/components/Products';
import ProductGrid from '../../src/app/components/ProductGrid';

jest.mock('../../src/app/components/ProductCard', () => {
  return function MockProductCard(props: any) {
    return <div data-testid="product-card">{props.name}</div>;
  };
});

describe('ProductGrid Component', () => {

  // test 1: Renders correct number of product cards
  test('should render the correct number of product cards', () => {
    render(<ProductGrid />);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(products.length);
  });

  // test 2: renders the correct product names
  test('should render the correct product names', () => {
    render(<ProductGrid />);
    products.forEach(product => {
      const productCard = screen.getByText(product.name);
      expect(productCard).toBeInTheDocument();
    });
  });
});