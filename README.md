# AI-Powered Next.js Template for Cursor IDE

A modern, AI-integrated Next.js template designed specifically for the Cursor IDE. This template provides a robust foundation for building intelligent web applications with features like AI image generation, web research, optimization tools, and brand asset creation.

![AI-powered workspace](public/images/home/hero.webp)

## Features

### 🎨 AI Image Generation
- Powered by Recraft V3 API
- Multiple style options including digital illustrations and realistic images
- Customizable image parameters
- Batch generation support

### 🔧 Image Optimization
- Automatic image optimization with Sharp.js
- WebP conversion for modern browsers
- Background removal capabilities
- Flexible resizing and quality settings

### 🎯 Brand Asset Generator
- Create consistent brand assets with AI
- Generate logos and variations
- Social media templates
- Business card designs

### 🔍 Web Research Tools
- AI-powered web search with Tavily API
- Multiple search modes: regular, Q&A, and context
- Domain filtering and advanced search options
- HTML to Markdown conversion for content processing

## Tech Stack

- **Frontend**: Next.js 15.1.3, React 19
- **Styling**: Tailwind CSS, Geist Font
- **AI Integration**: Recraft V3 API, Tavily API
- **Image Processing**: Sharp.js
- **Development**: TypeScript, ESLint
- **Performance**: Built-in image optimization, responsive design

## Getting Started

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd nextjs-ai-webpage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys:
   - `REPLICATE_API_TOKEN`: Get from [Replicate](https://replicate.com)
   - `TAVILY_API_KEY`: Get from [Tavily](https://tavily.com)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests (when implemented)

## Tools

### Image Generation
```bash
npx tsx tools/recraft.ts --prompt "your prompt" --style "style_name" [options]
```
Options:
- `--style`: Choose from various styles (digital_illustration, realistic_image, etc.)
- `--width` & `--height`: Set image dimensions
- `--num_outputs`: Number of images to generate
- More options available in the tool documentation

### Image Optimization
```bash
npx tsx tools/image-optimizer.ts <input> <output> [options]
```
Options:
- `--format`: Convert to webp/png/jpeg
- `--quality`: Set compression quality (1-100)
- `--resize`: Resize image (e.g., 800x600)
- `--remove-bg`: Remove image background

### Web Search
```bash
npm run tavily-search -- --query "your search query" [options]
```
Options:
- `--type`: Search type (search, qna, context)
- `--depth`: Search depth (basic, advanced)
- `--max-results`: Maximum number of results
- `--include`: Domains to include
- `--exclude`: Domains to exclude

### HTML to Markdown
```bash
npm run html-to-md -- --url "webpage-url" [options]
```
Options:
- `--output`: Output file path
- `--selector`: CSS selector for specific content

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          # Reusable React components
├── public/             # Static assets
│   └── images/         # Optimized images
├── tools/              # CLI tools
│   ├── recraft.ts      # Image generation
│   ├── image-optimizer.ts # Image processing
│   ├── tavily-search.ts  # Web search
│   └── html-to-md.ts     # Content conversion
├── styles/             # Global styles
└── docs/              # Project documentation
```

## Documentation

Detailed documentation is available in the `docs` directory:
- [Architecture](docs/architecture.md)
- [Frontend Guide](docs/frontend.md)
- [Backend Guide](docs/backend.md)
- [API Documentation](docs/api.md)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Recraft AI](https://recraft.ai) - AI image generation
- [Tavily](https://tavily.com) - AI-powered web search
- [Cursor IDE](https://cursor.sh) - AI-powered code editor
