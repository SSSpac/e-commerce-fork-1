import { render, screen } from '@testing-library/react'; //André
import SideBar from '../../src/app/components/SideBar';
import { useCart } from '../../src/app/components/providers/CartProvider';

jest.mock('../../src/app/components/providers/CartProvider', () => ({
  __esModule: true,
  useCart: jest.fn(),
}));

describe('SideBar', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
      total: 0,
      addToCart: jest.fn(),
    });
  });

  test('renderar utan krasch och visar knappen för varukorgen', () => {
    render(<SideBar />);
    const openCartButton = screen.getByRole('button', {
      name: /open cart|cart|varukorg|öppna varukorg/i,
    });
    expect(openCartButton).toBeInTheDocument();
  });
});