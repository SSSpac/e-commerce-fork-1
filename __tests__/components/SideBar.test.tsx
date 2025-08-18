import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideBar from "../../src/app/components/SideBar";
import { useCart } from "../../src/app/components/providers/CartProvider";

jest.mock("../../src/app/components/providers/CartProvider", () => ({
  __esModule: true,
  useCart: jest.fn(),
}));

describe("SideBar", () => {
  const useCartMock = useCart as jest.Mock;

  type Item = { id: number; name: string; price: number; imageUrl: string };

  let removeFromCartMock: jest.Mock;
  let clearCartMock: jest.Mock;

  let stateCart: Item[];

  const defaultItems: Item[] = [
    { id: 1, name: "Alpha Tee", price: 10, imageUrl: "https://example.com/a.jpg" },
    { id: 2, name: "Beta Jeans", price: 20, imageUrl: "https://example.com/b.jpg" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    removeFromCartMock = jest.fn();
    clearCartMock = jest.fn();
    stateCart = defaultItems;

    useCartMock.mockImplementation(() => ({
      cartItems: stateCart,
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      total: stateCart.reduce((s, i) => s + i.price, 0),
      addToCart: jest.fn(),
    }));
  });

  test("renders cart trigger with badge and total under icon", () => {
    render(<SideBar />);
    const trigger = screen.getByRole("button", { name: /open cart/i });
    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText("2")).toBeInTheDocument();
    expect(within(trigger).getByText("$30.00")).toBeInTheDocument();
  });

});
