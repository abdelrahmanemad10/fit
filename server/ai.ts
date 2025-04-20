import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRequest } from "@shared/types";

// Initialize Gemini API
const getGenerativeAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required but not set in environment variables");
  }
  return new GoogleGenerativeAI(apiKey);
};

// Generate fitness-specific system prompt
const getSystemPrompt = (language: string) => {
  if (language === "ar") {
    return "أنت مدرب لياقة بدنية محترف يساعد الناس على تحقيق أهدافهم الصحية. قدم نصائح دقيقة للتمارين، خطط غذائية، وجداول تدريبية. كن ودوداً ومشجعاً. أجب باللغة العربية فقط.";
  }
  
  return "You are a professional fitness trainer helping people achieve their health and fitness goals. Provide accurate exercise advice, dietary plans, and training schedules. Be friendly and encouraging. Answer in English only.";
};

// Generate chat response using Gemini
export async function generateChatResponse(request: ChatRequest): Promise<string> {
  try {
    const { message, language, history } = request;
    const genAI = getGenerativeAI();
    
    // For Gemini, we need to format the history correctly
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create system instruction as the first message
    const systemInstruction = getSystemPrompt(language);
    
    // Prepare conversation history
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));
    
    // Start a chat
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });
    
    // Add system instruction as first message if not in history
    if (history.length === 0) {
      await chat.sendMessage(`System: ${systemInstruction}`);
    }
    
    // Generate response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    
    // Return a fallback message based on language
    if (request.language === "ar") {
      return "عذراً، حدث خطأ أثناء توليد الرد. يرجى المحاولة مرة أخرى لاحقاً.";
    }
    
    return "Sorry, there was an error generating a response. Please try again later.";
  }
}
