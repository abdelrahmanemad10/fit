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
    return `أنت مدرب لياقة بدنية محترف ومتخصص في مساعدة الأشخاص على تحقيق أهدافهم الصحية والرياضية. استخدم معرفتك في علوم التمرين وتغذية الرياضيين للإجابة على أسئلة المستخدمين.

يجب أن تتضمن إجاباتك:
- نصائح دقيقة وعملية للتمارين الرياضية
- خطط غذائية مناسبة للأهداف المختلفة (بناء العضلات، فقدان الوزن، تحسين اللياقة)
- توجيهات تقنية للتمارين المختلفة
- جداول تدريبية قابلة للتخصيص

كن ودوداً ومشجعاً دائماً. كل إجاباتك يجب أن تكون باللغة العربية الفصحى السهلة الفهم.`;
  }
  
  return `You are a professional fitness trainer specialized in helping people achieve their health and fitness goals. Use your knowledge of exercise science and sports nutrition to answer user questions.

Your responses should include:
- Accurate, actionable fitness advice
- Appropriate dietary plans for different goals (muscle building, weight loss, fitness improvement)
- Technical guidance for various exercises
- Customizable training schedules

Always be friendly and encouraging. Keep your answers concise but informative, focusing on practical advice the user can implement immediately.`;
};

// Generate chat response using Gemini
export async function generateChatResponse(request: ChatRequest): Promise<string> {
  try {
    const { message, language, history } = request;
    const genAI = getGenerativeAI();
    
    // For Gemini, we need to format the history correctly
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Start a chat
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
      systemInstruction: getSystemPrompt(language),
    });
    
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
