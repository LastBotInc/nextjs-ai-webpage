'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Button } from '@/app/components/Button';

const GITHUB_URL = 'https://github.com/LastBotInc/nextjs-ai-webpage';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('hero.description')}
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button size="lg" href={GITHUB_URL}>
            {t('cta.button')}
          </Button>
          <Button size="lg" variant="outline" href={`${GITHUB_URL}#getting-started`}>
            {t('hero.getStarted')}
          </Button>
        </div>
        <Image
          src="/images/home/hero.webp"
          alt={t('hero.imageAlt')}
          width={800}
          height={400}
          className="mt-8 rounded-lg shadow-lg"
        />
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-16">
        {/* Image Generation */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{t('features.imageGeneration.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('features.imageGeneration.description')}
          </p>
          <Image
            src="/images/home/image-generation.webp"
            alt={t('features.imageGeneration.imageAlt')}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Image Optimization */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{t('features.imageOptimization.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('features.imageOptimization.description')}
          </p>
          <Image
            src="/images/home/optimization.webp"
            alt={t('features.imageOptimization.imageAlt')}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Brand Assets */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{t('features.brandAssets.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('features.brandAssets.description')}
          </p>
          <Image
            src="/images/home/brand-assets.webp"
            alt={t('features.brandAssets.imageAlt')}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Web Research Tools */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{t('features.webResearch.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('features.webResearch.description')}
          </p>
          <Image
            src="/images/home/web-research.webp"
            alt={t('features.webResearch.imageAlt')}
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t('cta.description')}
        </p>
        <Button size="lg" href={GITHUB_URL}>
          {t('cta.button')}
        </Button>
      </section>
    </main>
  );
}
