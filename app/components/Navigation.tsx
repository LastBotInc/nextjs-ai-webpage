'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/app/i18n/routing';
import LocaleSwitcher from '@/app/components/LocaleSwitcher';
import { useTheme } from 'next-themes';
import { Button } from '@/app/components/Button';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/services' as const, label: t('services') },
    { href: '/contact' as const, label: t('contact') }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[.1] dark:border-white/[.1] bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              AI-Powered
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-black dark:text-white bg-black/[.05] dark:bg-white/[.1]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/[.05] dark:hover:bg-white/[.1]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
            <Button
              variant="secondary"
              size="sm"
              aria-label="toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="!h-8 !w-8 !p-0 flex items-center justify-center"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
