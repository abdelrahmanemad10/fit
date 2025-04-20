import express from 'express';
import { z } from 'zod';

// Create Express app
const app = express();
app.use(express.json());

// Simple in-memory cache for API responses
const cache = new Map();
const CACHE_TTL = 7200000; // 2 hours in milliseconds
const MAX_CACHE_SIZE = 500; // Maximum number of cache entries

// Generate a cache key from request parameters
function generateCacheKey(message, language, history = []) {
  // Create a string representation of the history - limit to last 3 messages
  const recentHistory = history.slice(-3);
  const historyStr = recentHistory.map(msg => `${msg.role}:${msg.content.substring(0, 50)}`).join('|');
  
  // Combine all parameters into a single string
  return `${message}-${language}-${historyStr}`;
}

// Get item from cache
function getFromCache(key) {
  const item = cache.get(key);
  
  // If item doesn't exist or has expired
  if (!item || item.expiry < Date.now()) {
    if (item) cache.delete(key); // Clean up expired items
    return undefined;
  }
  
  return item.data;
}

// Set item in cache
function setInCache(key, data, ttl = CACHE_TTL) {
  // Enforce cache size limit - if at capacity, remove oldest item
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }
  
  const expiry = Date.now() + ttl;
  cache.set(key, { data, expiry });
}

// Chat endpoint for AI responses
app.post('/api/chat', async (req, res) => {
  try {
    // Validate request body
    const chatRequestSchema = z.object({
      message: z.string().min(1),
      language: z.string().default("en"),
      history: z.array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })
      ).optional().default([]),
    });

    const validatedRequest = chatRequestSchema.parse(req.body);
    
    // Generate cache key and check cache
    const cacheKey = generateCacheKey(
      validatedRequest.message, 
      validatedRequest.language, 
      validatedRequest.history
    );
    
    // Check if we have a cached response
    const cachedResponse = getFromCache(cacheKey);
    if (cachedResponse) {
      console.log('Using cached serverless response');
      return res.json({ reply: cachedResponse });
    }
    
    // No cache hit, generate new response
    
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required but not set in environment variables");
    }
    
    // Import Gemini
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Create a simple prompt that includes the system instruction
    let systemInstruction = "You are a professional fitness trainer helping people achieve their health and fitness goals. Provide accurate exercise advice, dietary plans, and training schedules. Be friendly and encouraging.";
    
    if (validatedRequest.language === "ar") {
      systemInstruction = "أنت مدرب لياقة بدنية محترف يساعد الناس على تحقيق أهدافهم الصحية. قدم نصائح دقيقة للتمارين، خطط غذائية، وجداول تدريبية. كن ودوداً ومشجعاً. أجب باللغة العربية فقط.";
    }
    
    // Use default Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const fullPrompt = `${systemInstruction}\n\nUser question: ${validatedRequest.message}`;
    
    // For simple chat functionality, we'll use generateContent method directly
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const responseText = response.text();
    
    // Cache the response
    setInCache(cacheKey, responseText);
    
    // Return the response
    res.json({ reply: responseText });
  } catch (error) {
    console.error("Error processing chat request:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request format", details: error.errors });
    } else {
      res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Run periodic cache cleanup every 30 minutes
setInterval(() => {
  const now = Date.now();
  let count = 0;
  
  // Clean up expired items
  for (const [key, item] of cache.entries()) {
    if (item.expiry < now) {
      cache.delete(key);
      count++;
    }
  }
  
  if (count > 0) {
    console.log(`Serverless cache cleanup: removed ${count} expired items`);
  }
}, 1800000); // 30 minutes

// Export the Express API
export default app;