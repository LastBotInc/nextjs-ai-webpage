"use strict";
const { generateImage } = require('./recraft');
async function generateAndSaveImage(prompt, style, filename) {
    const folder = "public/images"; // Default folder set to public/images
    try {
        console.log(`Starting image generation for ${filename}...`);
        const output = await generateImage({
            prompt,
            style,
            negative_prompt: "text, words, letters, realistic, photographic, complex, busy, detailed",
            size: "1024x1024",
            folder: folder, // Use the default folder
            filename: filename
        });
        console.log('Generation completed. Output:', output);
    }
    catch (error) {
        console.error(`Failed to generate image ${filename}:`, error);
    }
}
// Example usage:
async function main() {
    try {
        // Generate logo
        await generateAndSaveImage("A modern, minimalist logo design featuring two abstract hearts forming a subtle K shape, using coral pink (#FF6B6B) and mint (#4ECDC4) colors. The design should be clean, professional, and suitable for a dating app.", "digital_illustration/2d_art_poster", "kamu-logo.png");
        // Generate hero image
        await generateAndSaveImage("A modern, warm illustration showing diverse group of young people connecting and sharing interests, with subtle hearts and connection lines in coral pink (#FF6B6B) and mint (#4ECDC4) colors. The style should be minimal and clean.", "digital_illustration/2d_art_poster", "hero.png");
        // Generate feature images
        await generateAndSaveImage("A minimal illustration of an AI brain with heart elements, using coral pink (#FF6B6B) and mint (#4ECDC4) colors.", "digital_illustration/2d_art_poster", "feature-ai.png");
        await generateAndSaveImage("A minimal illustration of a map pin with heart elements and community symbols, using coral pink (#FF6B6B) and mint (#4ECDC4) colors.", "digital_illustration/2d_art_poster", "feature-local.png");
        await generateAndSaveImage("A minimal illustration of a shield with heart elements, using coral pink (#FF6B6B) and mint (#4ECDC4) colors.", "digital_illustration/2d_art_poster", "feature-safe.png");
    }
    catch (error) {
        console.error('Failed to generate all images:', error);
    }
}
// Run if called directly
if (require.main === module) {
    main();
}
