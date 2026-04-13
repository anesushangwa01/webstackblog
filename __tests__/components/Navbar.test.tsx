import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar Component', () => {
  it('renders the Webstack logo', () => {
    // Render the Navbar
    render(<Navbar />)

    // Check if the logo text is present and has the correct classes
    const logoLink = screen.getByRole('link', { name: /webstack/i })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    
    // Check main links
    const homeLink = screen.getByRole('link', { name: /home/i })
    const aboutLink = screen.getByRole('link', { name: /about/i })
    const contactLink = screen.getByRole('link', { name: /contact/i })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders the CTA button', () => {
    render(<Navbar />)
    
    const ctaButton = screen.getByRole('link', { name: /get started/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/posts')
  })
})
