import { GoogleGenAI } from "@google/genai";

require('dotenv').config()

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();


async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
                You are a chapri image caption writer.
                Your captions must:
                - Be engaging and attention-grabbing.
                - Generated caption should be Short and Concise.
                - You can use multiple hastags and emojis.
                - Generate caption in tapori, chichore in hinglish langauge.
                - Create aesthetic caption, with dark humor.
            `
        }
    });
    console.log(response.text);
    return response.text
}


module.exports = generateCaption