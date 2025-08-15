import { render, screen } from '@testing-library/react'
import Header from '@/app/components/Header'

jest.mock('next/image', () => (props: any) => {
  const { priority, ...rest } = props
  return <img {...rest} />
})

jest.mock('next/link', () => {
  return ({ href, children, ...rest }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...rest}>
      {children}
    </a>
  )
})

jest.mock('@/app/components/SideBar', () => () => <div>Mock Sidebar</div>)

describe('Header', () => {
  it('visar loggan i headern', () => {
    render(<Header />)

    
    const logo = screen.getByRole('img', { name: /logo/i })
    expect(logo).toBeInTheDocument()
  })

  it('loggan länkar till startsidan', () => {
    render(<Header />)

  
    const logoLink = screen.getByRole('link', { name: /logo/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renderar navigationen', () => {
    render(<Header />)


    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
