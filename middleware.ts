import createMiddleware from 'next-intl/middleware';
import { locales } from './app/i18n/routing';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fi'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use prefix for better SEO and clear URLs
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fi|en)/:path*']
};
