import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../../src/app/components/ProductCard";

const mockAddToCart = jest.fn();

jest.mock("../../src/app/components/providers/CartProvider", () => ({
  useCart: () => ({ addToCart: mockAddToCart }),
}));

describe("<ProductCard />", () => {
  const baseProps = {
    id: 1,
    name: "Nice Hoodie",
    price: 49.99,
    imageUrl: "https://example.com/hoodie.jpg",
  };

  beforeEach(() => {
    mockAddToCart.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("formats price with two decimals", () => {
    render(<ProductCard id={2} name="Cap" price={5} imageUrl="x" />);
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("button class toggles to gray while 'Added!'", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ProductCard id={3} name="Socks" price={9.5} imageUrl="y" />);
    const btn = screen.getByRole("button", { name: /add to cart/i });
    await user.click(btn);

    const addedBtn = screen.getByRole("button", { name: /added!/i });
    expect(addedBtn.className).toMatch(/bg-gray-600/);

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    const backBtn = screen.getByRole("button", { name: /add to cart/i });
    expect(backBtn.className).toMatch(/bg-blue-500/);
  });

  it("does not show 'Added!' before interaction and supports Enter on the button", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ProductCard {...baseProps} />);

    expect(screen.queryByRole("button", { name: /added!/i })).not.toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /add to cart/i });
    btn.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: /added!/i })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("renders name, price, image, and button", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("calls addToCart and toggles 'Added!' → 'Add to Cart' after 1500ms", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<ProductCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(baseProps);
    expect(screen.getByRole("button", { name: /added!/i })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    expect(await screen.findByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
