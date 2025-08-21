// André
import { render, screen } from "@testing-library/react";
import Header from "../../src/app/components/Header";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/app/components/SideBar", () => ({
  __esModule: true,
  default: () => <div>Mock Sidebar</div>,
}));

describe("Header", () => {
  test('link points to "/"', () => {
    render(<Header />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  test("renders at least one link", () => {
    render(<Header />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  test('renders image with alt text "Logo"', () => {
    render(<Header />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders SideBar component", () => {
    render(<Header />);
    expect(screen.getByText(/mock sidebar/i)).toBeInTheDocument();
  });

  test("Tab focuses the first link", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const firstLink = screen.getAllByRole("link")[0];
    await user.tab();
    expect(firstLink).toHaveFocus();
  });
});
