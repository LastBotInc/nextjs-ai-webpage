import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '../i18n/routing';
import Navigation from '@/app/components/Navigation';
import { requestLocale } from '@/i18n/request';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await requestLocale();

  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navigation />
        <main className={inter.className}>{children}</main>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
