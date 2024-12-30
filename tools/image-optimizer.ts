const Replicate = require('replicate');
const dotenv = require('dotenv');
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

dotenv.config();

interface OptimizeOptions {
  input: string;  // Path to input image
  output: string; // Path to output image
  removeBackground?: boolean;
  resize?: {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  };
  format?: 'png' | 'jpeg' | 'webp';
  quality?: number; // 1-100
}

async function optimizeImage(options: OptimizeOptions) {
  try {
    let imageBuffer = await readFile(options.input);
    let pipeline = sharp(imageBuffer);

    // Remove background if requested
    if (options.removeBackground) {
      console.log('Removing background...');
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      // Convert image to base64 URL
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

      const output = await replicate.run(
        "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
        {
          input: {
            image: base64Image
          }
        }
      );

      // Download the processed image
      const response = await fetch(output);
      imageBuffer = Buffer.from(await response.arrayBuffer());
      pipeline = sharp(imageBuffer);
    }

    // Resize if requested
    if (options.resize) {
      console.log('Resizing image...');
      pipeline = pipeline.resize({
        width: options.resize.width,
        height: options.resize.height,
        fit: options.resize.fit || 'cover'
      });
    }

    // Convert format if requested
    if (options.format) {
      console.log(`Converting to ${options.format}...`);
      switch (options.format) {
        case 'png':
          pipeline = pipeline.png();
          break;
        case 'jpeg':
          pipeline = pipeline.jpeg({
            quality: options.quality || 80
          });
          break;
        case 'webp':
          pipeline = pipeline.webp({
            quality: options.quality || 80
          });
          break;
      }
    }

    // Ensure output directory exists
    const outputDir = path.dirname(options.output);
    await require('fs').promises.mkdir(outputDir, { recursive: true });

    // Save the processed image
    await pipeline.toFile(options.output);
    console.log(`Image saved to ${options.output}`);

  } catch (error) {
    console.error('Failed to optimize image:', error);
    throw error;
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: npx ts-node tools/image-optimizer.ts <input> <output> [options]');
  console.error('Options:');
  console.error('  --remove-bg            Remove background');
  console.error('  --resize WxH           Resize image (e.g., 800x600)');
  console.error('  --format FORMAT        Convert to format (png, jpeg, webp)');
  console.error('  --quality NUMBER       Set quality (1-100)');
  process.exit(1);
}

const [input, output] = args;
const options: OptimizeOptions = { input, output };

// Parse options
for (let i = 2; i < args.length; i++) {
  switch (args[i]) {
    case '--remove-bg':
      options.removeBackground = true;
      break;
    case '--resize':
      const [width, height] = args[++i].split('x').map(Number);
      options.resize = { width, height };
      break;
    case '--format':
      options.format = args[++i] as 'png' | 'jpeg' | 'webp';
      break;
    case '--quality':
      options.quality = parseInt(args[++i]);
      break;
  }
}

optimizeImage(options);
