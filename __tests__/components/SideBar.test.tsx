import { render, screen, within } from "@testing-library/react"; //André
import userEvent from "@testing-library/user-event";
import SideBar from "../../src/app/components/SideBar";
import { useCart } from "../../src/app/components/providers/CartProvider";

jest.mock("../../src/app/components/providers/CartProvider", () => ({
  __esModule: true,
  useCart: jest.fn(),
}));

describe("SideBar", () => {
  const useCartMock = useCart as jest.Mock;

  let removeFromCartMock: jest.Mock;
  let clearCartMock: jest.Mock;

  const items = [
    { id: 1, name: "Alpha Tee", price: 10, imageUrl: "https://example.com/a.jpg" },
    { id: 2, name: "Beta Jeans", price: 20, imageUrl: "https://example.com/b.jpg" },
  ];

  beforeEach(() => {
    removeFromCartMock = jest.fn();
    clearCartMock = jest.fn();
    useCartMock.mockReturnValue({
      cartItems: items,
      removeFromCart: removeFromCartMock,
      clearCart: clearCartMock,
      total: 30,
      addToCart: jest.fn(),
    });
  });

  test("renders cart trigger with badge and total under icon", () => {
    render(<SideBar />);
    const trigger = screen.getByRole("button", { name: /open cart/i });
    expect(trigger).toBeInTheDocument();
    expect(within(trigger).getByText("2")).toBeInTheDocument();
    expect(within(trigger).getByText("$30.00")).toBeInTheDocument();
  });

  test("renders items list with name, price, image and remove buttons", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));

    const list = screen.getByRole("list");
    const listItems = within(list).getAllByRole("listitem");
    expect(listItems.length).toBe(2);

    expect(within(listItems[0]).getByText("Alpha Tee")).toBeInTheDocument();
    expect(within(listItems[0]).getByText("$10.00")).toBeInTheDocument();
    expect(within(listItems[0]).getByRole("img", { name: /alpha tee/i })).toBeInTheDocument();
    expect(within(listItems[0]).getByRole("button", { name: "X" })).toBeInTheDocument();
  });
});
