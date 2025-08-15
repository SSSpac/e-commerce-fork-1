import { render, screen } from '@testing-library/react'; //André
import Header from '@/app/components/Header';

jest.mock('next/image', () => (props: any) => {
  const { priority, ...rest } = props
  return <img {...rest} />
});

jest.mock('next/link', () => {
  return ({ href, children, ...rest }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...rest}>
      {children}
    </a>
  );
});

jest.mock('@/app/components/SideBar', () => () => <div>Mock Sidebar</div>);


describe('Header', () => {
  
  describe('Logotypen', () => {
    it('visar logotypen i headern', () => {
      render(<Header />);

      
      const logo = screen.getByRole('img', { name: /logo/i });
      expect(logo).toBeInTheDocument();
    });

    it('logotypen länkar till startsidan', () => {
      render(<Header />);

      
      const logoLink = screen.getByRole('link', { name: /logo/i });
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });
  
  
  describe('Navigationen', () => {
    it('renderar navigationen', () => {
      render(<Header />);
      
    
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
    });
    
    it('renderar sidofältskomponenten (SideBar)', () => {
      render(<Header />);

      
      const sidebar = screen.getByText('Mock Sidebar');
      expect(sidebar).toBeInTheDocument();
    });
  });
});