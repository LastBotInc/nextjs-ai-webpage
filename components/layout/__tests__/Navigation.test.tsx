import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Navigation from '../Navigation'
import { useTheme } from 'next-themes'

// Mock next-themes
const mockSetTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: mockSetTheme,
  })),
}))

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the logo', () => {
    render(<Navigation />)
    expect(screen.getByText('AI-Powered')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navigation />)
    const links = ['Home', 'About', 'Services', 'Contact']
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('highlights the current page in navigation', () => {
    render(<Navigation />)
    // Since we mocked usePathname to return '/', the Home link should be highlighted
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveClass('border-primary-700')
  })

  it('toggles theme when theme button is clicked', () => {
    const { unmount } = render(<Navigation />)
    const themeButton = screen.getByLabelText(/toggle theme/i)

    // Initial state is light, clicking should set to dark
    fireEvent.click(themeButton)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')

    // Clean up the first render
    unmount()

    // Mock theme change to dark
    ;(useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'dark',
      setTheme: mockSetTheme,
    }))

    // Re-render with new theme
    render(<Navigation />)
    const updatedThemeButton = screen.getByLabelText(/toggle theme/i)

    // Now clicking should set to light
    fireEvent.click(updatedThemeButton)
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })
})
