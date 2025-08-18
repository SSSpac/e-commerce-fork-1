import React from "react";
import { render, screen } from "@testing-library/react";
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

  it("formats price with two decimals", () => {
    render(<ProductCard id={2} name="Cap" price={5} imageUrl="x" />);
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("renders name, price, image, and button", () => {
    render(<ProductCard {...baseProps} />);
    expect(screen.getByRole("heading", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /nice hoodie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });
});
