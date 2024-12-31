import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'fi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = 'en' as const;

export const localePrefix = 'always'; // Default

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    fi: '/tietoa'
  },
  '/services': {
    en: '/services',
    fi: '/palvelut'
  },
  '/contact': {
    en: '/contact',
    fi: '/yhteystiedot'
  }
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
