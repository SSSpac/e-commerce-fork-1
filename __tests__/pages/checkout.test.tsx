import {render, screen, fireEvent} from '@testing-library/react';
import CheckoutPage from '@/app/checkout';
import {useCart} from '@/app/components/providers/CartProvider';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/app/components/providers/CartProvider', () => ({
  ...jest.requireActual('../../src/app/components/providers/CartProvider'),
  useCart: jest.fn(),
}));

const mockCartItems = [
  { id: 1, name: 'The Urban Explorer', price: 95.00, imageUrl: 'url1', qty: 1 },
  { id: 5, name: 'Sneaker Pro', price: 120.00, imageUrl: 'url2', qty: 2 },
];

describe('CheckoutPage', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
      cartTotal: 335.00, 
      clearCart: jest.fn(),
    });
  });
 
  test('should render the order summary with items from the cart', () => {
    render(<CheckoutPage />);

    expect(screen.getByText('The Urban Explorer')).toBeInTheDocument();
    expect(screen.getByText('Sneaker Pro')).toBeInTheDocument();
    
    const total = (335.00 * 1.08).toFixed(2);
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });

  test('should allow a user to type in the email input', () => {
    render(<CheckoutPage />);
    
    const emailInput = screen.getByPlaceholderText(/email address/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
   
    expect(emailInput).toHaveValue('test@example.com');
  });
});