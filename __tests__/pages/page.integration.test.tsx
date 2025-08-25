import { render, screen, within } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import HomePage from "../../src/app/page";
import CartProvider from "../../src/app/components/providers/CartProvider";
import { products } from "../../src/app/components/Products";

const renderHome = () =>
  render(
    <CartProvider>
      <HomePage />
    </CartProvider>
  );

describe("HomePage (integration with real products)", () => {
  test("renders one card per product (by h3 headings)", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(products.length);
  });

  test("includes a few known products by name", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 3 });
    const names = headings.map(h => h.textContent?.trim());
    expect(names).toEqual(expect.arrayContaining([
      "Sneaker Pro",
      "Classic Hoodie",
      "Denim Shirt",
    ]));
  });

  test("each card shows a price with two decimals matching the data file", () => {
    renderHome();
    const byName = new Map(products.map(p => [p.name, p]));

    const headings = screen.getAllByRole("heading", { level: 3 });
    for (const h of headings) {
      const name = h.textContent?.trim() || "";
      const card = h.parentElement as HTMLElement;
      const priceEl = within(card).getByText(/\$\d+\.\d{2}/);
      const priceText = priceEl.textContent?.trim() || "";

      const expected = byName.get(name);
      expect(expected).toBeTruthy();
      expect(priceText).toBe(`$${expected!.price.toFixed(2)}`);
    }
  });

  test("each card image alt matches the product name", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 3 });
    for (const h of headings) {
      const name = h.textContent?.trim() || "";
      const card = h.parentElement as HTMLElement;
      const img = within(card).getByRole("img", { name: new RegExp(`^${name}$`, "i") });
      expect(img).toBeInTheDocument();
    }
  });

  test("filter example: all 'shoes' names render on the page", () => {
    renderHome();
    const shoeNames = products.filter(p => p.category === "shoes").map(p => p.name);
    const headings = screen.getAllByRole("heading", { level: 3 });
    const rendered = headings.map(h => h.textContent?.trim());
    for (const name of shoeNames) {
      expect(rendered).toContain(name);
    }
  });

  test("Add to Cart toggles to 'Added!' then back after 1500ms for a chosen card", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    renderHome();

    const targetName = "Sneaker Pro";
    const heading = screen.getByRole("heading", { level: 3, name: targetName });
    const card = heading.parentElement as HTMLElement;

    const btn = within(card).getByRole("button", { name: /add to cart/i });
    await user.click(btn);
    expect(within(card).getByRole("button", { name: /added!/i })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(within(card).getByRole("button", { name: /add to cart/i })).toBeInTheDocument();

    jest.useRealTimers();
  });
});
