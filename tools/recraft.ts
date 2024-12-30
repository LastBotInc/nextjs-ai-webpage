import Replicate from 'replicate';
import dotenv from 'dotenv';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Ensure script only runs in development
if (process.env.NODE_ENV === 'production') {
  console.error('This tool is only available in development environment');
  process.exit(1);
}

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

export type RecraftStyle =
  | "realistic_image"
  | "digital_illustration"
  | "digital_illustration/pixel_art"
  | "digital_illustration/hand_drawn"
  | "digital_illustration/grain"
  | "digital_illustration/infantile_sketch"
  | "digital_illustration/2d_art_poster"
  | "digital_illustration/handmade_3d"
  | "digital_illustration/hand_drawn_outline"
  | "digital_illustration/engraving_color"
  | "digital_illustration/2d_art_poster_2"
  | "realistic_image/b_and_w"
  | "realistic_image/hard_flash"
  | "realistic_image/hdr"
  | "realistic_image/natural_light"
  | "realistic_image/studio_portrait"
  | "realistic_image/enterprise"
  | "realistic_image/motion_blur";

export interface GenerateImageOptions {
  prompt: string;
  style: RecraftStyle;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  scheduler?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
  folder: string;
  filename: string;
}

export async function generateImage(options: GenerateImageOptions): Promise<string> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });

  try {
    // Create output directory if it doesn't exist
    await mkdir(options.folder, { recursive: true });

    const prediction = await replicate.run(
      "lucataco/recraft-v3:c5ad045c2fb2e36562db26b0e2210c3c0f09e2d7e7a0f0c6b9bfb3cf0c8a4c7d",
      {
        input: {
          prompt: options.prompt,
          style: options.style,
          negative_prompt: options.negative_prompt,
          width: options.width || 1024,
          height: options.height || 1024,
          num_outputs: options.num_outputs || 1,
          scheduler: options.scheduler,
          num_inference_steps: options.num_inference_steps || 50,
          guidance_scale: options.guidance_scale || 7.5,
          seed: options.seed,
        },
      }
    );

    const outputPath = path.join(options.folder, options.filename);
    const imageUrl = (prediction as { output: string[] }).output[0];

    // Download and save the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(buffer));

    return outputPath;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
