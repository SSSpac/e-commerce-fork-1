import { render, screen } from '@testing-library/react';
import HomePage from '../../src/app/page';
import CartProvider from '../../src/app/components/providers/CartProvider';

jest.mock('../../src/app/components/ProductGrid', () => {
  return function MockProductGrid() {
    return <div data-testid="product-grid">Products Here</div>;
  };
});

const renderHome = () =>
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
);

    describe('HomePage smoke', () => {
      test("shows main headling", () => {
        renderHome();
        expect(screen.getByRole('heading', { name: /our products/i })).toBeInTheDocument();
      })

      test("shows product grid placeholder", () => {
        renderHome();
        expect(screen.getByTestId('product-grid')).toBeInTheDocument();
      })

      test("has main elemetn", () => {
        renderHome();
        expect(screen.getByRole('main')).toBeInTheDocument();
      })

      test("no error text shown", () => {
        renderHome();
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      })

    });