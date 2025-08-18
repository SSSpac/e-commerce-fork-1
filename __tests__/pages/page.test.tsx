import { render, screen } from '@testing-library/react';
import HomePage from '../../src/app/page';
import CartProvider from '../../src/app/components/providers/CartProvider';

jest.mock('../../src/app/components/ProductGrid', () => {
  return function MockProductGrid() {
    return <div data-testid="product-grid">Products Here</div>;
  };
});

describe('HomePage Tests', () => {
  test('shows main heading', () => {
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
    );

    const heading = screen.getByRole('heading', { name: /our products/i });
    expect(heading).toBeInTheDocument();
  });

  test('shows product grid', () => {
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
    );

    const grid = screen.getByTestId('product-grid');
    expect(grid).toBeInTheDocument();
  });

  test('has main element', () => {
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('no error text shown', () => {
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
    );

    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();
  });
});