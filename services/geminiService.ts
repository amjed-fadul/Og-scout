import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const diagnoseCarIssue = async (userDescription: string): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are an expert automotive mechanic assistant.
      The user is describing a problem with their car: "${userDescription}".
      
      Please provide:
      1. A brief, potential diagnosis (keep it under 3 sentences).
      2. A list of 3 possible causes.
      3. The type of specialist workshop they should look for (e.g., "Transmission Specialist", "General Mechanic", "Auto Electrician").
      
      Format the response using Markdown. Keep the tone helpful and professional.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't generate a diagnosis at this time. Please try again.";
  } catch (error) {
    console.error("Error diagnosing car issue:", error);
    return "Sorry, I encountered an error connecting to the diagnostic service. Please check your connection.";
  }
};