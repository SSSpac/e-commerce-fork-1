//André
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

  test("opens on click and closes with the close button", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    expect(dialog.className).toMatch(/translate-x-0/);

    await user.click(screen.getByRole("button", { name: /close sidebar/i }));
    expect(dialog.className).toMatch(/translate-x-full/);
  });

  test("closes on Escape press", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    expect(dialog.className).toMatch(/translate-x-0/);

    await user.keyboard("{Escape}");
    expect(dialog.className).toMatch(/translate-x-full/);
  });

  test("closes when clicking the overlay", async () => {
    const user = userEvent.setup();
    const { container } = render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    expect(dialog.className).toMatch(/translate-x-0/);

    const overlay = container.querySelector('div[class*="bg-black/40"]') as HTMLElement;
    await user.click(overlay);
    expect(dialog.className).toMatch(/translate-x-full/);
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

  test("remove button calls removeFromCart with item name", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const removeButtons = screen.getAllByRole("button", { name: "X" });
    await user.click(removeButtons[0]);
    expect(removeFromCartMock).toHaveBeenCalledWith("Alpha Tee");
  });

  test("shows confirmation modal for 'Clear Cart' and cancels/clears correctly", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));

    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    await user.click(within(dialog).getByRole("button", { name: /clear cart/i }));

    const modal = screen.getByText(/do you really want to clear your cart\?/i).closest("div") as HTMLElement;
    expect(within(modal).getByRole("heading", { name: /are you sure\?/i })).toBeInTheDocument();

    await user.click(within(modal).getByRole("button", { name: /cancel/i }));
    expect(screen.queryByRole("heading", { name: /are you sure\?/i })).not.toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: /clear cart/i }));
    const modal2 = screen.getByText(/do you really want to clear your cart\?/i).closest("div") as HTMLElement;
    await user.click(within(modal2).getByRole("button", { name: /^clear cart$/i }));
    expect(clearCartMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("heading", { name: /are you sure\?/i })).not.toBeInTheDocument();
  });

  test("hides badge and mini-total when cart is empty and shows empty state in dialog", async () => {
  
    stateCart = [];

    const user = userEvent.setup();
    render(<SideBar />);

    const trigger = screen.getByRole("button", { name: /open cart/i });
    expect(within(trigger).queryByText(/^\d+$/)).not.toBeInTheDocument();
    expect(within(trigger).queryByText("$0.00")).not.toBeInTheDocument();

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    expect(within(dialog).getByText(/your cart is empty\./i)).toBeInTheDocument();
    expect(within(dialog).queryByRole("button", { name: /clear cart/i })).not.toBeInTheDocument();
    expect(within(dialog).getByText("$0.00")).toBeInTheDocument();
  });

  test("footer total shows formatted sum", async () => {
    stateCart = defaultItems;
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const dialog = screen.getByRole("dialog", { name: /cart sidebar/i });
    expect(within(dialog).getByText("$30.00")).toBeInTheDocument();
  });

  test("checkout link points to /checkout", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    await user.click(screen.getByRole("button", { name: /open cart/i }));
    const checkoutLink = screen.getByRole("link", { name: /checkout/i });
    expect(checkoutLink).toHaveAttribute("href", "/checkout");
  });
});
