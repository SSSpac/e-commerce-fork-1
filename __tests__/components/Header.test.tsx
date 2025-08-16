import { render, screen } from '@testing-library/react'; //André
import Header from '../../src/app/components/Header';

jest.mock('../../src/app/components/SideBar', () => ({
  __esModule: true,
  default: () => <div>Mock Sidebar</div>,
}));

describe('Header', () => {
  test('länken pekar på "/"', () => {
    render(<Header />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  test('bilden med alt-text "Logo" finns', () => {
    render(<Header />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('SideBar-komponenten renderas', () => {
    render(<Header />);
    expect(screen.getByText(/mock sidebar/i)).toBeInTheDocument();
  });
});