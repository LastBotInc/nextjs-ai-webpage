'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/app/i18n/routing';
import { locales } from '@/app/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="h-8 px-2 text-sm bg-transparent border border-black/[.1] dark:border-white/[.1] rounded-md text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black/[.3] dark:focus:ring-white/[.3]"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc} className="bg-white dark:bg-gray-800">
          {loc === 'en' ? 'English' : 'Suomi'}
        </option>
      ))}
    </select>
  );
}
