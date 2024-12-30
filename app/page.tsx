import Image from "next/image";
import { Button } from "./components/Button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                AI-Powered Next.js Template
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {" "}for Cursor IDE
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Build intelligent web applications faster with our AI-integrated Next.js template.
                Featuring Recraft image generation, optimization tools, and modern development practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  View on GitHub
                </Button>
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] lg:aspect-[16/10]">
              <Image
                src="/images/home/hero.webp"
                alt="AI-powered workspace illustration"
                fill
                className="rounded-lg shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to build AI-powered applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1: Image Generation */}
            <div className="flex flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/home/image-generation.webp"
                  alt="AI Image Generation Feature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI Image Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate stunning images with Recraft V3 API integration. Create any visual content with simple text prompts.
                </p>
              </div>
            </div>

            {/* Feature 2: Image Optimization */}
            <div className="flex flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/home/optimization.webp"
                  alt="Image Optimization Feature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Image Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimize your images automatically with our built-in tools. Reduce file size while maintaining quality.
                </p>
              </div>
            </div>

            {/* Feature 3: Brand Assets */}
            <div className="flex flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/home/brand-assets.webp"
                  alt="Brand Asset Generator Feature"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Brand Asset Generator</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create consistent brand assets with AI. Generate logos, social media templates, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Get started with our template and build your next project faster.
          </p>
          <Button size="lg">
            Start Building Now
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
      </section>
    </div>
  );
}
