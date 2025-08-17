import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
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

  it("renderar namn, pris och bild", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("anropar addToCart och växlar 'Added!' → 'Add to Cart' efter 1500ms", async () => {
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
