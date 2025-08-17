import { render, screen } from '@testing-library/react';
import CheckoutPage from '@/app/checkout';
import { useCart } from '@/app/components/providers/CartProvider';
import userEvent from '@testing-library/user-event';
import CartProvider from '../../src/app/components/providers/CartProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/app/components/providers/CartProvider', () => ({
  useCart: jest.fn(),
}));

const items = [
  { id: 1, name: 'Hat', price: 20, imageUrl: 'hat.jpg', qty: 1 },
  { id: 2, name: 'Shirt', price: 30, imageUrl: 'shirt.jpg', qty: 1 },
];

describe('Checkout Tests', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: items,
      cartTotal: 50,
      clearCart: jest.fn(),
    });
  });

  test('shows checkout heading', () => {
    render(<CheckoutPage />);
    const heading = screen.getByRole('heading', { name: /checkout/i });
    expect(heading).toBeInTheDocument();
  });

  test('can type in email field', async () => {
    const user = userEvent.setup();
    render(<CheckoutPage />);
    
    const email = screen.getByPlaceholderText('Email Address');
    await user.type(email, 'test@test.com');
    
    expect(email).toHaveValue('test@test.com');
  });

  test('shows place order button', () => {
    render(<CheckoutPage />);
    const button = screen.getByRole('button', { name: /place order/i });
    expect(button).toBeInTheDocument();
  });

  test('can type in zip code', async () => {
    const user = userEvent.setup();
    render(<CheckoutPage />);
    
    const zip = screen.getByPlaceholderText('ZIP Code');
    await user.type(zip, '12345');
    
    expect(zip).toHaveValue('12345');
  });

  test('shows cart items', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('Hat')).toBeInTheDocument();
    expect(screen.getByText('Shirt')).toBeInTheDocument();
  });

  test('empty cart shows message', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      cartTotal: 0,
      clearCart: jest.fn(),
    });
    
    render(<CheckoutPage />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    
    const orderButton = screen.queryByText(/place order/i);
    expect(orderButton).not.toBeInTheDocument();
  });
  describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('cart state changes when adding items', async () => {
    const user = userEvent.setup();
    
    const TestApp = () => {
      const { addToCart, cartItems } = require('../../src/app/components/providers/CartProvider').useCart();
      
      return (
        <div>
          <button onClick={() => addToCart({ id: 1, name: 'Hat', price: 20, imageUrl: 'hat.jpg' })}>
            Add Hat
          </button>
          <div data-testid="count">{cartItems.length}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestApp />
      </CartProvider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    
    await user.click(screen.getByText('Add Hat'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  test('removing items changes cart state', async () => {
    const user = userEvent.setup();
    
    const TestApp = () => {
      const { addToCart, removeFromCart, cartItems } = require('../../src/app/components/providers/CartProvider').useCart();
      
      return (
        <div>
          <button onClick={() => addToCart({ id: 1, name: 'Hat', price: 20, imageUrl: 'hat.jpg' })}>
            Add Hat
          </button>
          <button onClick={() => removeFromCart('Hat')}>
            Remove Hat
          </button>
          <div data-testid="count">{cartItems.length}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestApp />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Hat'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    
    await user.click(screen.getByText('Remove Hat'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('total price updates with items', async () => {
    const user = userEvent.setup();
    
    const TestApp = () => {
      const { addToCart, cartTotal } = require('../../src/app/components/providers/CartProvider').useCart();
      
      return (
        <div>
          <button onClick={() => addToCart({ id: 1, name: 'Hat', price: 20, imageUrl: 'hat.jpg' })}>
            Add Hat
          </button>
          <div data-testid="total">${cartTotal}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestApp />
      </CartProvider>
    );

    expect(screen.getByTestId('total')).toHaveTextContent('$0');
    
    await user.click(screen.getByText('Add Hat'));
    expect(screen.getByTestId('total')).toHaveTextContent('$20');
  });
});
});