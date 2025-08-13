const { GoogleGenAI } = require("@google/genai");
require('dotenv').config()

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({        // This chunk of code help me to send the req to the google Gemini if you not pass the gemini key then it will not know that its the user so it will decline the request 
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
    const response = await ai.models.generateContent({      //  sends a prompt to Gemini.
        model: "gemini-2.5-flash",                          // we’re using the fast version of Gemini 2.5.
        contents: "Explain how AI works in a few words",    // is our prompt/question for Gemini.
    });
    console.log(response.text);                             // response.text → gives us the plain text answer from Gemini.
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
        { text: "Create a concise, engaging, and professional caption for this image. Avoid clichés and describe the key visual elements vividly." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
                You are a professional image caption writer.
                Your captions must:
                - Be engaging and attention-grabbing without exaggeration.
                - Generated caption should be Short and Concise.
                - You can use hastags and emojis.
                - Avoid filler words, clichés, and unnecessary repetition.
                - Generate caption in tapori, chichore in hinglish langauge.
                - Create aesthetic caption, with dark humor.
            `
        }
    });
    console.log(response.text);
    return response.text
}

module.exports = generateCaption