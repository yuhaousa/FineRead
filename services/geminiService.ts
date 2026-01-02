
import { GoogleGenAI, Type } from "@google/genai";
import { CapabilityType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * AI Reading Buddy: Socratic questioning logic.
   */
  async getSocraticBuddyResponse(text: string, currentQuestion: string, studentInput: string, history: { role: 'user' | 'model', text: string }[]) {
    const prompt = `
      You are "ReadMind Buddy", a Socratic reading companion for middle school students.
      Context:
      Reading Text: "${text}"
      Current Exercise Question: "${currentQuestion}"
      Student said: "${studentInput}"

      Guidelines:
      1. DO NOT give direct answers.
      2. Use guiding questions to lead the student to find the answer themselves.
      3. Encourage deep thinking (PISA R1-R4 capabilities).
      4. Speak in warm, encouraging Chinese.
      5. Keep responses concise (under 100 words).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
          { parts: [{ text: prompt }] }
        ]
      });
      return response.text || "我还在思考，你能换个说法吗？";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "抱歉，我的思维稍有断片，咱们继续讨论这段文字吧。";
    }
  },

  /**
   * Generates a set of PISA questions personalized for the student.
   * Refined to handle specific text types and difficulty standards.
   */
  async generatePISAQuestions(text: string, title: string, type: string, difficulty: string, targetCapability?: CapabilityType) {
    const prompt = `
      As an expert Chinese teacher, generate 4 PISA-aligned reading comprehension questions for the ${type} text "${title}".
      Difficulty Level: ${difficulty}.
      Text Content: "${text}"
      
      PISA Dimension Rules for Science Texts:
      - R1 (Access/Retrieve): Focus on specific definitions, data, or explicit conditions.
      - R2 (Direct Inference): Infer causal relationships (if A then B), mechanisms, or predict results.
      - R3 (Integrate/Interpret): Synthesize full mechanism or explain scientific metaphors/principles.
      - R4 (Evaluate/Reflect): Challenge scientific rigor, identify evidence vs opinion, or evaluate societal impact/ethics.

      Personalization:
      - The student is currently struggling with ${targetCapability || 'overall'}. Make this specific dimension more challenging.

      Return as a JSON array of objects with:
      - id: string (e.g., q1, q2...)
      - capability: CapabilityType (R1, R2, R3, R4)
      - prompt: string (the question text)
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                capability: { type: Type.STRING, enum: Object.values(CapabilityType) },
                prompt: { type: Type.STRING }
              },
              required: ["id", "capability", "prompt"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Question Generation Error:", error);
      return [];
    }
  },

  /**
   * Evaluates student's answer based on PISA framework.
   */
  async evaluateAnswer(capability: CapabilityType, question: string, answer: string, textContext: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze the following student answer based on PISA ${capability} framework.
        If the text is Scientific, evaluate based on logical rigor and evidence-based reasoning.
        Text Context: ${textContext}
        Question: ${question}
        Student Answer: ${answer}

        Provide feedback in JSON format:
        - score: 0-100
        - feedback: Constructive feedback in Chinese.
        - suggestions: How to improve (e.g., "Cite more evidence", "Refine causal logic").
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            suggestions: { type: Type.STRING }
          },
          required: ["score", "feedback", "suggestions"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }
};
