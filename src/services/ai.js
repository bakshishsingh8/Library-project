import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Gemini API Key missing!");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// -------------------------
// PICK FASTEST MODEL
// -------------------------
async function getValidModelName() {
  return "gemini-2.5-flash"; // works for free plans
}

// -------------------------
// MAIN SEARCH FUNCTION
// -------------------------
export const searchBooksWithAI = async (userQuery) => {
  const modelName = await getValidModelName();
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
    You are a librarian. Recommend exactly 5 books related to "${userQuery}".
    Return ONLY JSON. No markdown, no explanations.
    Format:
    [
      {"id":"1","title":"Book Title","desc":"Description","price":200,"img":"book"}
    ]
  `;

  try {
    const { response } = await model.generateContent(prompt);
    let text = response.text();

    // CLEANING OUTPUT
    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/json\n/gi, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error(`❌ AI Error:`, error);
    return [];
  }
};
