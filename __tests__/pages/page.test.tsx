import {render, screen} from '@testing-library/react';
import HomePage from '../../src/app/page';
import CartProvider from '../../src/app/components/providers/CartProvider';

jest.mock('../../src/app/components/ProductGrid', () => {
  return function MockProductGrid() {
    return <div data-testid="product-grid">Mock Product Grid</div>;
  };
});

describe ('HomePage Component', () => {
  test('should render main heading and product grid', () => {
    render(
      <CartProvider>
        <HomePage />
      </CartProvider>
    );

    const mainHeading = screen.getByRole('heading', { name: /our products/i });
    expect(mainHeading).toBeInTheDocument();

    const productGrid = screen.getByTestId('product-grid');
    expect(productGrid).toBeInTheDocument();
    expect(productGrid).toHaveTextContent('Mock Product Grid');
  })
});