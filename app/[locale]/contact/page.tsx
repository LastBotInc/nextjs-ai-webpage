import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{t('description')}</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('contact.website')}</h3>
                <Link
                  href="https://www.lastbot.com"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  www.lastbot.com
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('contact.email')}</h3>
                <Link
                  href="mailto:pasi@lastbot.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  pasi@lastbot.com
                </Link>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">{t('locations.title')}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('locations.oulu')}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('locations.espoo')}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('locations.sacramento')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
