import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Overview */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('description')}</p>
      </div>

      {/* Founder Section */}
      <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">{t('founder.title')}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden">
            <Image
              src="/images/pasi-headshot.webp"
              alt={t('founder.name')}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{t('founder.name')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t('founder.role')}</p>
            <p className="text-gray-600 dark:text-gray-300">{t('founder.bio')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
