import Replicate from 'replicate';
import dotenv from 'dotenv';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Ensure script only runs in development
if (process.env.NODE_ENV === 'production') {
  console.error('This tool is only available in development environment');
  process.exit(1);
}

console.log('Script started');

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}

// Log environment variables (without sensitive data)
console.log('Environment check:', {
  hasReplicateToken: !!process.env.REPLICATE_API_TOKEN,
  nodeEnv: process.env.NODE_ENV,
  pwd: process.cwd()
});

type RecraftStyle =
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

type RecraftSize =
  | "1024x1024"
  | "1365x1024"
  | "1024x1365"
  | "1536x1024"
  | "1024x1536"
  | "1820x1024"
  | "1024x1820"
  | "1024x2048"
  | "2048x1024"
  | "1434x1024"
  | "1024x1434"
  | "1024x1280"
  | "1280x1024"
  | "1024x1707"
  | "1707x1024";

interface RecraftOptions {
  prompt: string;
  style?: RecraftStyle;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  scheduler?: "DDIM" | "DPMSolverMultistep" | "HeunDiscrete" | "KarrasDPM" | "K_EULER_ANCESTRAL" | "K_EULER" | "PNDM";
  num_inference_steps?: number;
  guidance_scale?: number;
  seed?: number;
  folder?: string;
  filename?: string;
}

interface ApiError {
  name?: string;
  message?: string;
  stack?: string;
  response?: {
    status?: number;
    statusText?: string;
    data?: any;
  };
}

class RecraftGenerator {
  private static DEFAULT_OPTIONS = {
    width: 1024,
    height: 1024,
    num_outputs: 1,
    scheduler: "DPMSolverMultistep",
    num_inference_steps: 50,
    guidance_scale: 7.5,
  };

  static async generateImage(options: RecraftOptions): Promise<string[]> {
    console.log('Starting image generation with options:', {
      prompt: options.prompt,
      style: options.style,
      width: options.width || RecraftGenerator.DEFAULT_OPTIONS.width,
      height: options.height || RecraftGenerator.DEFAULT_OPTIONS.height,
      num_outputs: options.num_outputs || RecraftGenerator.DEFAULT_OPTIONS.num_outputs,
    });

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
    }

    console.log('Environment variables loaded, API token present');

    let replicate;
    try {
      replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
      console.log('Replicate client initialized successfully');
    } catch (error) {
      console.error('Error initializing Replicate client:', error);
      throw error;
    }

    try {
      console.log('Calling Recraft API with model: recraft-ai/recraft-v3');
      const modelInput = {
        prompt: options.prompt,
        style: options.style,
        negative_prompt: options.negative_prompt,
        width: options.width || RecraftGenerator.DEFAULT_OPTIONS.width,
        height: options.height || RecraftGenerator.DEFAULT_OPTIONS.height,
        num_outputs: options.num_outputs || RecraftGenerator.DEFAULT_OPTIONS.num_outputs,
        scheduler: options.scheduler || RecraftGenerator.DEFAULT_OPTIONS.scheduler,
        num_inference_steps: options.num_inference_steps || RecraftGenerator.DEFAULT_OPTIONS.num_inference_steps,
        guidance_scale: options.guidance_scale || RecraftGenerator.DEFAULT_OPTIONS.guidance_scale,
        seed: options.seed,
      };
      console.log('Model input:', modelInput);

      const output = await replicate.run(
        "recraft-ai/recraft-v3",
        { input: modelInput }
      );

      console.log('Received response from Recraft API:', output);

      // Convert output to array if it's a string
      const outputUrls = typeof output === 'string' ? [output] : output;

      if (!outputUrls || !Array.isArray(outputUrls) || outputUrls.length === 0) {
        throw new Error('No image URLs received from Recraft API');
      }

      if (options.folder && options.filename) {
        console.log(`Saving image to ${path.join(options.folder, options.filename)}...`);

        try {
          await mkdir(options.folder, { recursive: true });
          console.log('Created output directory:', options.folder);
        } catch (err: any) {
          console.log('Directory already exists or error creating directory:', err.message);
        }

        try {
          console.log('Fetching image from URL:', outputUrls[0]);
          const response = await fetch(outputUrls[0]);

          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
          }

          const buffer = Buffer.from(await response.arrayBuffer());
          console.log('Image downloaded, size:', buffer.length, 'bytes');

          await writeFile(path.join(options.folder, options.filename), buffer);
          console.log('Image saved successfully');
        } catch (err: any) {
          console.error('Error saving image:', err);
          throw err;
        }
      }

      return outputUrls;
    } catch (error: any) {
      console.error('Error in image generation process:', {
        name: error.name,
        message: error.message,
        status: (error as ApiError).response?.status,
        statusText: (error as ApiError).response?.statusText,
        data: (error as ApiError).response?.data,
      });

      // Log the full error object for debugging
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw error;
    }
  }
}

// Export for CommonJS
module.exports = {
  RecraftGenerator,
  generateImage: RecraftGenerator.generateImage
};

// CLI interface
const isRunningAsCLI = process.argv[1]?.endsWith('recraft.ts');
if (isRunningAsCLI) {
  console.log('CLI mode detected');
  console.log('Arguments:', process.argv);

  const args = process.argv.slice(2);
  const options: RecraftOptions = {
    prompt: "",
  };

  console.log('Parsing command line arguments:', args);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '--prompt':
        options.prompt = nextArg;
        i++;
        break;
      case '--style':
        options.style = nextArg as RecraftStyle;
        i++;
        break;
      case '--negative-prompt':
        options.negative_prompt = nextArg;
        i++;
        break;
      case '--width':
        options.width = parseInt(nextArg);
        i++;
        break;
      case '--height':
        options.height = parseInt(nextArg);
        i++;
        break;
      case '--num-outputs':
        options.num_outputs = parseInt(nextArg);
        i++;
        break;
      case '--scheduler':
        options.scheduler = nextArg as any;
        i++;
        break;
      case '--num-inference-steps':
        options.num_inference_steps = parseInt(nextArg);
        i++;
        break;
      case '--guidance-scale':
        options.guidance_scale = parseFloat(nextArg);
        i++;
        break;
      case '--seed':
        options.seed = parseInt(nextArg);
        i++;
        break;
      case '--folder':
        options.folder = nextArg;
        i++;
        break;
      case '--filename':
        options.filename = nextArg;
        i++;
        break;
    }
  }

  console.log('Parsed options:', options);

  // Call generateImage with the parsed options
  RecraftGenerator.generateImage(options)
    .then(urls => {
      console.log('Generated image URLs:', urls);
    })
    .catch(error => {
      console.error('Error generating image:', error);
      process.exit(1);
    });
}
