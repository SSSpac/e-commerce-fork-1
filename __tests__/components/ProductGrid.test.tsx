import { render, screen } from '@testing-library/react';
import { products } from '../../src/app/data/page';
import ProductGrid from '../../src/app/components/ProductGrid/page';

jest.mock('../../src/app/components/ProductCard/page', () => {
  return function MockCard(props: any) {
    return <div data-testid="product-card">{props.name}</div>;
  };
});

describe('ProductGrid Tests', () => {
  test('shows all product cards', () => {
    render(<ProductGrid />);
    const cards = screen.getAllByTestId('product-card');
    expect(cards.length).toBe(products.length);
  });

  test('shows product names', () => {
    render(<ProductGrid />);
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(products[1].name)).toBeInTheDocument();
  });

  test('renders at least one product', () => {
    render(<ProductGrid />);
    const cards = screen.getAllByTestId('product-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});