import { useState } from "react";
import { apiRequest } from "./queryClient";
import { cacheService, generateCacheKey } from "./cacheService";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type UseChatOptions = {
  initialMessages?: Message[];
};

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(options.initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to send message to API
  const sendMessage = async (content: string, language: string = "en") => {
    try {
      setIsLoading(true);
      setError(null);

      // Optimistically add user message to state
      const userMessage: Message = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);

      // Check if response is in cache
      const cacheKey = generateCacheKey(content, language, messages);
      const cachedResponse = cacheService.get<{ reply: string }>(cacheKey);

      let data;
      
      if (cachedResponse) {
        // Use cached response
        console.log('Using cached response');
        data = cachedResponse;
      } else {
        // Make API request
        const response = await apiRequest("POST", "/api/chat", {
          message: content,
          language,
          history: messages,
        });

        // Get response data
        data = await response.json();
        
        // Store in cache (1 hour TTL)
        cacheService.set(cacheKey, data);
      }

      // Add AI response to messages
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat
  const reset = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    reset,
  };
}
