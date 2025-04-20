import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRequest } from "@shared/types";
import { serverCacheService, generateServerCacheKey } from "./cacheService";

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
    
    // Generate cache key based on request
    const cacheKey = generateServerCacheKey(message, language, history || []);
    
    // Check if we have a cached response
    const cachedResponse = serverCacheService.get<string>(cacheKey);
    if (cachedResponse) {
      console.log('Using cached server response');
      return cachedResponse;
    }
    
    // No cache hit, generate new response
    const genAI = getGenerativeAI();
    
    // Use default Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Create a simple prompt that includes the system instruction
    const systemInstruction = getSystemPrompt(language);
    const fullPrompt = `${systemInstruction}\n\nUser question: ${message}`;
    
    // For simple chat functionality, we'll use generateContent method directly
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const responseText = response.text();
    
    // Cache the response (2 hours TTL)
    serverCacheService.set(cacheKey, responseText, 7200000);
    
    return responseText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    
    // Return a fallback message based on language
    if (request.language === "ar") {
      return "عذراً، حدث خطأ أثناء توليد الرد. يرجى المحاولة مرة أخرى لاحقاً.";
    }
    
    return "Sorry, there was an error generating a response. Please try again later.";
  }
}
