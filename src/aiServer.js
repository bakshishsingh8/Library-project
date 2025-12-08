// // src/aiService.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // ⚠️ REPLACE THIS WITH YOUR ACTUAL API KEY
// const API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY_HERE"; 
// const genAI = new GoogleGenerativeAI(API_KEY);

// export const searchBooksWithAI = async (userQuery) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
//     You are a librarian API. The user is searching for books related to: "${userQuery}".
//     Return a list of 4 to 6 real books that match this search.
    
//     IMPORTANT: You must return the result as a raw JSON array. 
//     Do not include markdown formatting like \`\`\`json.
    
//     The JSON objects must strictly follow this structure:
//     [
//       {
//         "id": "unique_string_id",
//         "title": "Book Title",
//         "desc": "A short 1-sentence description.",
//         "price": 250,
//         "img": "generate_a_relevant_keyword_for_image_search"
//       }
//     ]~
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     // Clean up potential markdown formatting from AI
//     const text = response.text().replace(/```json|```/g, '').trim();
//     return JSON.parse(text);
//   } catch (error) {
//     console.error("AI Error:", error);
//     return [];
//   }
// };

// src/aiService.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Try to get the key from either Vite or Create React App
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;

// // Debug logs
// if (!API_KEY) {
//   console.error("❌ API Key is MISSING. Check your .env file.");
// } else {
//   console.log("✅ API Key found.");
// }

// const genAI = new GoogleGenerativeAI(API_KEY);

// export const searchBooksWithAI = async (userQuery) => {
//   // ⚠️ CHANGED MODEL TO 'gemini-pro' (This is the fix)
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `
//     You are a librarian API. The user is searching for books related to: "${userQuery}".
//     Return a list of 5 real books that match this search.
    
//     IMPORTANT: You must return the result as a raw JSON array. 
//     Do not include markdown formatting like \`\`\`json.
    
//     The JSON objects must strictly follow this structure:
//     [
//       {
//         "id": "unique_string_id",
//         "title": "Book Title",
//         "desc": "A short 1-sentence description.",
//         "price": 250,
//         "img": "book"
//       }
//     ]
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text().replace(/```json|```/g, '').trim();
    
//     console.log("✅ AI Response:", text);
//     return JSON.parse(text);
//   } catch (error) {
//     console.error("❌ AI Error Details:", error);
//     return [];
//   }
// };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // 1. Get Key
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// if (!API_KEY) {
//   console.error("❌ API Key is MISSING. Check .env file.");
// }

// const genAI = new GoogleGenerativeAI(API_KEY);

// // ---------------------------------------------------------
// // 🧠 HELPER: Find a valid STABLE model
// // ---------------------------------------------------------
// async function getValidModelName() {
//   // ⚠️ HARD FIX: We are forcing the "Flash" model because it is the fastest 
//   // and has the highest free limits (15 RPM).
//   // "gemini-1.5-flash" is the best for search features.
//   const preferredModel = "gemini-1.5-flash"; 
  
//   console.log(`✅ Using preferred high-limit model: ${preferredModel}`);
//   return preferredModel;
// }

// // ---------------------------------------------------------
// // 🔎 SEARCH FUNCTION
// // ---------------------------------------------------------
// export const searchBooksWithAI = async (userQuery) => {
//   // 1. Get the model name
//   const modelName = await getValidModelName();
  
//   const model = genAI.getGenerativeModel({ model: modelName });

//   const prompt = `
//     You are a librarian. Recommend 5 books about: "${userQuery}".
//     Return STRICT JSON format. 
//     Do not use markdown.
    
//     Structure:
//     [{"id":"1","title":"Book Title","desc":"Description","price":200,"img":"book"}]
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text().replace(/```json|```/g, '').trim();
//     return JSON.parse(text);
//   } catch (error) {
//     console.error(`❌ Error with model ${modelName}:`, error);
    
//     // If Flash fails (rare), return empty array
//     return [];
//   }
// };


import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const searchBooksWithAI = async (userQuery) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(`
      You are a librarian. Recommend exactly 5 books related to "${userQuery}".
      Return ONLY JSON:
      [
        {"id":"1","title":"Book Title","desc":"Description","price":200,"img":"book"}
      ]
    `);

    const responseText = result.response.text().trim();

    const cleaned = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "");

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ AI Error:", error);
    return [];
  }
};

