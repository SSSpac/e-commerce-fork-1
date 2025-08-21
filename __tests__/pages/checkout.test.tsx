import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "../../src/app/checkout/page";
import { useCart } from "../../src/app/components/providers/CartProvider";

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("../../src/app/components/providers/CartProvider", () => ({
  ...jest.requireActual("../../src/app/components/providers/CartProvider"),
  useCart: jest.fn(),
}));

type Item = { id: string; name: string; price: number; imageUrl: string; qty: number };

function mockCart(initial: Item[] = []) {
  let state = {
    cartItems: [...initial],
    cartTotal: initial.reduce((s, i) => s + i.price * i.qty, 0),
  };
  (useCart as jest.Mock).mockImplementation(() => ({
    cartItems: state.cartItems,
    cartTotal: state.cartTotal,
    clearCart: jest.fn(),
    addToCart: (it: Item) => {
      const e = state.cartItems.find((x) => x.id === it.id);
      e ? (e.qty += it.qty) : (state.cartItems = [...state.cartItems, { ...it }]);
      state.cartTotal = state.cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    },
  }));
}

function AddButton({ product }: { product: Item }) {
  const { addToCart } = useCart() as any;
  return <button onClick={() => addToCart(product)}>Add {product.name}</button>;
}

function renderApp(children?: React.ReactNode) {
  return render(
    <>
      {children}
      <CheckoutPage />
    </>
  );
}

function expectSubtotal(v: string) {
  expect(screen.getByText("Subtotal").closest("div")!).toHaveTextContent(v);
}
function expectTax(v: string) {
  expect(screen.getByText("Tax").closest("div")!).toHaveTextContent(v);
}
function expectQty(v: number) {
  expect(screen.getByText(/Qty:/i)).toHaveTextContent(`Qty: ${v}`);
}
function expectPlaceOrder(v: string) {
  expect(screen.getByRole("button", { name: new RegExp(`Place Order - \\$${v}`) })).toBeInTheDocument();
}

describe("CheckoutPage integration", () => {
  beforeEach(() => (useCart as jest.Mock).mockReset());

  test("empty cart: total is 0 and items are 0 (empty state)", () => {
    (useCart as jest.Mock).mockReturnValue({ cartItems: [], cartTotal: 0, clearCart: jest.fn() });
    renderApp();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/Qty:/i)).toBeNull();
    expect(screen.queryByRole("button", { name: /Place Order/i })).toBeNull();
  });

  test("click Add in product grid → total equals product price and items = 1", () => {
    mockCart();
    const p = { id: "p1", name: "Shoe", price: 100, imageUrl: "/x.jpg", qty: 1 };
    const { rerender } = renderApp(<AddButton product={p} />);

    fireEvent.click(screen.getByText(/Add Shoe/i));
    rerender(
      <>
        <AddButton product={p} />
        <CheckoutPage />
      </>
    );

    expectQty(1);
    expectSubtotal("$100.00");
    expectTax("$8.00");
    expectPlaceOrder("100.00");
  });

  test("adding the same item twice updates qty and tax", () => {
    mockCart();
    const p = { id: "p1", name: "Shoe", price: 99, imageUrl: "/x.jpg", qty: 1 };
    const { rerender } = renderApp(<AddButton product={p} />);

    fireEvent.click(screen.getByText(/Add Shoe/i));
    rerender(
      <>
        <AddButton product={p} />
        <CheckoutPage />
      </>
    );
    fireEvent.click(screen.getByText(/Add Shoe/i));
    rerender(
      <>
        <AddButton product={p} />
        <CheckoutPage />
      </>
    );

    expectQty(2);
    expectSubtotal("$198.00");
    expectTax("$15.84");
    expectPlaceOrder("198.00");
  });

  test("adding different items combines totals and tax", () => {
    mockCart();
    const p1 = { id: "p1", name: "Shoe", price: 99, imageUrl: "/x.jpg", qty: 1 };
    const p2 = { id: "p2", name: "Sock", price: 50, imageUrl: "/y.jpg", qty: 1 };
    const { rerender } = renderApp(
      <>
        <AddButton product={p1} />
        <AddButton product={p2} />
      </>
    );

    fireEvent.click(screen.getByText(/Add Shoe/i));
    rerender(
      <>
        <AddButton product={p1} />
        <AddButton product={p2} />
        <CheckoutPage />
      </>
    );
    fireEvent.click(screen.getByText(/Add Sock/i));
    rerender(
      <>
        <AddButton product={p1} />
        <AddButton product={p2} />
        <CheckoutPage />
      </>
    );

    expectSubtotal("$149.00");
    expectTax("$11.92");
    expectPlaceOrder("149.00");
  });

  test("email input is editable when cart has items", async () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [{ id: "p1", name: "Shoe", price: 99, imageUrl: "/x.jpg", qty: 1 }],
      cartTotal: 99,
      clearCart: jest.fn(),
    });
    renderApp();
    const email = screen.getByPlaceholderText(/email address/i);
    await userEvent.type(email, "test@example.com");
    expect(email).toHaveValue("test@example.com");
  });
});
