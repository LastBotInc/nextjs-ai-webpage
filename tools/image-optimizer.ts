import Replicate from 'replicate';
import dotenv from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import sharp, { FormatEnum } from 'sharp';

// Ensure script only runs in development
if (process.env.NODE_ENV === 'production') {
  console.error('This tool is only available in development environment');
  process.exit(1);
}

dotenv.config();

export interface OptimizeImageOptions {
  input: string;
  output: string;
  removeBg?: boolean;
  resize?: {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  };
  format?: keyof FormatEnum;
  quality?: number;
}

export async function optimizeImage(options: OptimizeImageOptions): Promise<string> {
  try {
    let buffer = await readFile(options.input);

    // Remove background if requested
    if (options.removeBg) {
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN as string,
      });

      const prediction = await replicate.run(
        "lucataco/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        {
          input: {
            image: buffer.toString('base64'),
          },
        }
      );

      const imageUrl = (prediction as { output: string }).output;
      const response = await fetch(imageUrl);
      buffer = Buffer.from(await response.arrayBuffer());
    }

    // Process with sharp
    let image = sharp(buffer);

    // Resize if specified
    if (options.resize) {
      image = image.resize(
        options.resize.width,
        options.resize.height,
        {
          fit: options.resize.fit || 'contain',
        }
      );
    }

    // Convert format if specified
    const format = (options.format || path.extname(options.output).slice(1) || 'webp') as keyof FormatEnum;
    const quality = options.quality || 80;

    image = image.toFormat(format, { quality });

    // Save the processed image
    buffer = await image.toBuffer();
    await writeFile(options.output, buffer);

    return options.output;
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}
