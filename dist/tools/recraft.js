import Replicate from 'replicate';
import dotenv from 'dotenv';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
// Load environment variables
const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
}
export class RecraftGenerator {
    static async generateImage(options) {
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
        }
        catch (error) {
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
            const output = await replicate.run("recraft-ai/recraft-v3", { input: modelInput });
            console.log('Received response from Recraft API:', output);
            if (!output || !Array.isArray(output) || output.length === 0) {
                throw new Error('No image URLs received from Recraft API');
            }
            if (options.folder && options.filename) {
                console.log(`Saving image to ${path.join(options.folder, options.filename)}...`);
                try {
                    await mkdir(options.folder, { recursive: true });
                    console.log('Created output directory:', options.folder);
                }
                catch (err) {
                    console.log('Directory already exists or error creating directory:', err.message);
                }
                try {
                    console.log('Fetching image from URL:', output[0]);
                    const response = await fetch(output[0]);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
                    }
                    const buffer = Buffer.from(await response.arrayBuffer());
                    console.log('Image downloaded, size:', buffer.length, 'bytes');
                    await writeFile(path.join(options.folder, options.filename), buffer);
                    console.log('Image saved successfully');
                }
                catch (err) {
                    console.error('Error saving image:', err);
                    throw err;
                }
            }
            return output;
        }
        catch (error) {
            console.error('Error in image generation process:', {
                name: error.name,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
            });
            // Log the full error object for debugging
            console.error('Full error object:', JSON.stringify(error, null, 2));
            throw error;
        }
    }
}
RecraftGenerator.DEFAULT_OPTIONS = {
    width: 1024,
    height: 1024,
    num_outputs: 1,
    scheduler: "DPMSolverMultistep",
    num_inference_steps: 50,
    guidance_scale: 7.5,
};
export const { generateImage } = RecraftGenerator;
// CLI interface
if (process.argv[1] === import.meta.url) {
    const args = process.argv.slice(2);
    const options = {
        prompt: "",
    };
    console.log('Parsing command line arguments...');
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const nextArg = args[i + 1];
        switch (arg) {
            case '--prompt':
                options.prompt = nextArg;
                i++;
                break;
            case '--style':
                options.style = nextArg;
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
                options.scheduler = nextArg;
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
    if (!options.prompt) {
        console.error('Error: --prompt is required');
        process.exit(1);
    }
    RecraftGenerator.generateImage(options)
        .then(urls => {
        console.log('Generated images:');
        urls.forEach(url => console.log(url));
        console.log('Image generation completed successfully');
    })
        .catch(error => {
        console.error('Error in main process:', error.message);
        process.exit(1);
    });
}
