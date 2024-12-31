import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales } from '@/app/i18n/routing';

export async function requestLocale() {
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') || 'en';
  return locale;
}

// This is the configuration for next-intl.
// It runs on the server, so you can use Node.js APIs and read from the filesystem.
export default getRequestConfig(async () => {
  const locale = await requestLocale();

  // Load messages for the requested locale
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return {
    locale,
    messages,
    timeZone: 'Europe/Helsinki',
    now: new Date(),
  };
});
