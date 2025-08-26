import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPage from "../../src/app/checkout/page";
import CartProvider from "../../src/app/components/providers/CartProvider";
import { products } from "../../src/app/components/Products";
import Header from "../../src/app/components/Header";
import HomePage from "@/app/page";

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));


beforeEach(() => {
  window.localStorage.clear();
});

describe("Complete E-commerce Flow", () => {
  test("full shopping flow: homepage -> cart -> checkout summary", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <CartProvider>
        <Header />
        <HomePage />
      </CartProvider>
    );

    const product1 = products[0];
    const product2 = products[1];

    const addButtons = await screen.findAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);
    await user.click(addButtons[1]);

    const cartButton = screen.getByRole("button", { name: /Open cart/i });
    await user.click(cartButton);

    const sidebar = screen.getByRole("dialog", { name: "Cart sidebar" });
    expect(within(sidebar).getByText(product1.name)).toBeInTheDocument();
    expect(within(sidebar).getByText(product2.name)).toBeInTheDocument();

    const checkoutButton = within(sidebar).getByRole("link", { name: /checkout/i });
    await user.click(checkoutButton);

    rerender(
      <CartProvider>
        <Header />
        <CheckoutPage />
      </CartProvider>
    );

    const summaryHeading = screen.getByRole("heading", { name: /order summary/i });
    const summary = summaryHeading.closest('section');
    expect(summary).not.toBeNull();

    expect(within(summary!).getByText(product1.name)).toBeInTheDocument();
    expect(within(summary!).getByText(product2.name)).toBeInTheDocument();

    const qtyTexts = within(summary!).getAllByText(/Qty:/);
    expect(qtyTexts).toHaveLength(2);

    const total = product1.price + product2.price;
    const tax = total * 0.08;
    const finalTotal = total + tax;

    expect(within(summary!).getByText('Subtotal').parentElement).toHaveTextContent(`$${total.toFixed(2)}`);
    expect(within(summary!).getByText('Tax').parentElement).toHaveTextContent(`$${tax.toFixed(2)}`);
    expect(within(summary!).getByText('Total').parentElement).toHaveTextContent(`$${finalTotal.toFixed(2)}`);
  });
});
