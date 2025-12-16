import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const searchBooksWithAI = async (userQuery) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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

