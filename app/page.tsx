import Image from "next/image";
import { Button } from "./components/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Web Development</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Build intelligent web applications with Next.js and AI capabilities
        </p>
        <Image
          src="/images/home/hero.webp"
          alt="AI-powered workspace"
          width={800}
          height={400}
          className="mt-8 rounded-lg shadow-lg"
        />
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-16">
        {/* Image Generation */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">🎨 AI Image Generation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create stunning visuals with Recraft V3 API. Choose from multiple styles and customize to your needs.
          </p>
          <Image
            src="/images/home/image-generation.webp"
            alt="AI Image Generation"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Image Optimization */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">🔧 Image Optimization</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Optimize images automatically with background removal, resizing, and format conversion.
          </p>
          <Image
            src="/images/home/optimization.webp"
            alt="Image Optimization"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Brand Assets */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">🎯 Brand Asset Generator</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Generate consistent brand assets including logos, social media templates, and business cards.
          </p>
          <Image
            src="/images/home/brand-assets.webp"
            alt="Brand Asset Generation"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Web Research Tools */}
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">🔍 Web Research Tools</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Powerful AI-driven web research with Tavily API. Search, analyze, and process web content with multiple modes and advanced filtering.
          </p>
          <Image
            src="/images/home/web-research.webp"
            alt="Web Research Tools"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Build your next project with AI-powered tools and modern web technologies.
        </p>
        <a
          href="https://github.com/yourusername/nextjs-ai-webpage"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          View on GitHub
        </a>
      </section>
    </main>
  );
}
