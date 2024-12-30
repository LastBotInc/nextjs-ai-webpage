'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/app/components/Button'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[.1] dark:border-white/[.1] bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              AI-Powered
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`h-16 flex items-center border-b-2 ${
                  pathname === href
                    ? 'border-primary-700 text-primary-700'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <Button
              variant="secondary"
              size="sm"
              aria-label="toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
