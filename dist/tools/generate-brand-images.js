import { RecraftGenerator } from './recraft';
async function generateLogotype() {
    console.log('Generating Kamu logotype...');
    await RecraftGenerator.generateImage({
        prompt: "A bold, modern logotype with 'KAMU' text in a chunky, contemporary sans-serif font. The text should be large and prominent, with a vibrant yellow-orange gradient (#FFE45E to #FFB347). Each letter should be bold and confident, with subtle rounded corners for friendliness. The style should be clean and impactful, like a modern tech brand. The background should be pure white. The text should take up most of the canvas width for maximum impact.",
        style: "digital_illustration/2d_art_poster_2",
        negative_prompt: "thin lines, delicate, complex, busy, ornate, metallic, 3D, childish, corporate, formal, dark colors, shadows, textures, small text, decorative elements",
        folder: "public/brand",
        filename: "kamu-logotype.png",
        width: 1024,
        height: 256
    });
    console.log('Logotype generated successfully');
}
async function generateHeroImage() {
    console.log('Generating hero image...');
    await RecraftGenerator.generateImage({
        prompt: "A joyful group of diverse friends (3-4 people) looking at a phone together, laughing and having fun. Natural, candid moment with warm lighting. Modern setting like a cafe or cozy living room. The image should feel authentic and spontaneous.",
        style: "realistic_image/natural_light",
        negative_prompt: "artificial poses, stock photo look, overly staged, formal attire, business setting",
        folder: "public/images",
        filename: "hero.png",
        width: 1536,
        height: 1024
    });
    console.log('Hero image generated successfully');
}
async function generateSocialProofImages() {
    console.log('Generating social proof images...');
    const socialScenes = [
        {
            prompt: "Two friends painting together at an art studio, sharing creative moments. Natural interaction with genuine smiles. Casual, relaxed atmosphere.",
            filename: "social-1.png",
            width: 1024,
            height: 1365
        },
        {
            prompt: "Friends having coffee at a trendy cafe, engaged in conversation. Authentic moment with natural gestures and expressions. Warm, inviting atmosphere.",
            filename: "social-2.png",
            width: 1365,
            height: 1024
        },
        {
            prompt: "Friends cooking together in a modern kitchen, sharing recipes and laughing. Casual, home setting with natural lighting. Genuine interaction.",
            filename: "social-3.png",
            width: 1365,
            height: 1024
        }
    ];
    for (const scene of socialScenes) {
        await RecraftGenerator.generateImage({
            ...scene,
            style: "realistic_image/natural_light",
            negative_prompt: "artificial poses, stock photo look, overly staged, formal attire",
            folder: "public/images"
        });
    }
    console.log('Social proof images generated successfully');
}
async function generateFeatureImages() {
    console.log('Generating feature images...');
    const features = [
        {
            prompt: "Person using a modern phone app with an engaging smile, AI interface elements visible on screen. Clean, modern setting with soft natural lighting.",
            filename: "feature-ai.png"
        },
        {
            prompt: "Two friends meeting for the first time, warm handshake or friendly greeting at a local park or cafe. Natural, candid moment showing genuine connection.",
            filename: "feature-local.png"
        },
        {
            prompt: "Person feeling safe and comfortable while using their phone, surrounded by modern security UI elements. Warm, trustworthy atmosphere.",
            filename: "feature-safe.png"
        }
    ];
    for (const feature of features) {
        await RecraftGenerator.generateImage({
            ...feature,
            style: "realistic_image/natural_light",
            negative_prompt: "artificial poses, stock photo look, overly staged, corporate setting",
            folder: "public/images",
            width: 1024,
            height: 1024
        });
    }
    console.log('Feature images generated successfully');
}
async function generateAllImages() {
    try {
        await generateLogotype();
        await generateHeroImage();
        await generateSocialProofImages();
        await generateFeatureImages();
        console.log('All images generated successfully');
    }
    catch (error) {
        console.error('Failed to generate images:', error);
    }
}
// Get the command line argument
const imageType = process.argv[2];
// Execute based on command line argument
if (imageType) {
    (async () => {
        try {
            switch (imageType) {
                case 'logo':
                    await generateLogotype();
                    break;
                case 'hero':
                    await generateHeroImage();
                    break;
                case 'social':
                    await generateSocialProofImages();
                    break;
                case 'features':
                    await generateFeatureImages();
                    break;
                default:
                    console.error('Invalid image type. Available types: logo, hero, social, features');
            }
        }
        catch (error) {
            console.error(`Failed to generate ${imageType}:`, error);
        }
    })();
}
else {
    // If no argument provided, generate all images
    generateAllImages();
}
