import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../../src/app/components/ProductCard/ProductCard";
import userEvent from "@testing-library/user-event";

const mockAddToCart = jest.fn();
jest.mock("../../src/app/components/Providers/CartProvider", () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    cart: [],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  }),
}));

describe("<ProductCard />", () => {
  const baseProps = {
    id: 1,
    name: "Nice Hoodie",
    price: 49.99,
    imageUrl: "https://example.com/hoodie.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("formats price with two decimals", () => {
    render(<ProductCard id={2} name="Cap" price={5} imageUrl="/" />);
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("renders name, price, image, and button", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("calls addToCart when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductCard {...baseProps} />);
    
    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);
    
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      name: "Nice Hoodie",
      price: 49.99,
      imageUrl: "https://example.com/hoodie.jpg",
    });
  });
});