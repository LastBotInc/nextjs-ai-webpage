import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('description')}</p>
      </div>

      {/* Services Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 mb-16">
        {['aiDevelopment', 'generativeAI', 'promptEngineering'].map((service) => (
          <div key={service} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">{t(`services.${service}.title`)}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t(`services.${service}.description`)}</p>
            {service === 'aiDevelopment' && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {t(`services.${service}.clients`)}
              </p>
            )}
            {service === 'generativeAI' && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t(`services.${service}.focus`)}
              </p>
            )}
            {service === 'promptEngineering' && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t(`services.${service}.practical`)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Trainer Section */}
      <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden shrink-0">
            <Image
              src="/images/pasi-headshot.webp"
              alt={t('trainer.title')}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('trainer.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t('trainer.description')}</p>
            <p className="text-gray-500 dark:text-gray-400 italic">{t('trainer.experience')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
