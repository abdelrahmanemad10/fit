import { useState, useCallback } from "react";
import { apiRequest } from "./queryClient";
import { cacheService, generateCacheKey } from "./cacheService";

type Message = {
  role: "user" | "assistant";
  content: string;
  fromCache?: boolean;
};

type UseChatOptions = {
  initialMessages?: Message[];
};

export function useChat(options: UseChatOptions = {}) {
  // Initialize all state variables at the top
  const [messages, setMessages] = useState<Message[]>(options.initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cacheStats, setCacheStats] = useState({
    size: cacheService.size(),
    enabled: true
  });

  // Function to send message to API
  const sendMessage = useCallback(async (content: string, language: string = "en") => {
    try {
      setIsLoading(true);
      setError(null);

      // Optimistically add user message to state
      const userMessage: Message = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);

      let data;
      let fromCache = false;
      
      // Check if response is in cache and caching is enabled
      if (cacheStats.enabled) {
        const cacheKey = generateCacheKey(content, language, messages);
        const cachedResponse = cacheService.get<{ reply: string }>(cacheKey);
        
        if (cachedResponse) {
          // Use cached response
          console.log('Using cached response');
          data = cachedResponse;
          fromCache = true;
        } else {
          // Make API request
          const response = await apiRequest("POST", "/api/chat", {
            message: content,
            language,
            history: messages,
          });

          // Get response data
          data = await response.json();
          
          // Store in cache (2 hour TTL)
          cacheService.set(cacheKey, data, 7200000);
        }
      } else {
        // Make API request - bypass cache
        const response = await apiRequest("POST", "/api/chat", {
          message: content,
          language,
          history: messages,
        });

        // Get response data
        data = await response.json();
      }

      // Add AI response to messages
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        fromCache
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Update cache stats
      setCacheStats(prev => ({
        size: cacheService.size(),
        enabled: prev.enabled
      }));
      
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [messages, cacheStats.enabled]);

  // Reset chat
  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  
  // Clear cache
  const clearCache = useCallback(() => {
    cacheService.clear();
    setCacheStats(prev => ({
      size: 0,
      enabled: prev.enabled
    }));
  }, []);
  
  // Toggle cache
  const toggleCache = useCallback(() => {
    setCacheStats(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    reset,
    clearCache,
    toggleCache,
    cacheStats
  };
}
