import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ChatRequest } from "@shared/types";
import { z } from "zod";
import { generateChatResponse } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for AI responses
  app.post("/api/chat", async (req, res) => {
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

      const validatedRequest = chatRequestSchema.parse(req.body) as ChatRequest;
      
      // Generate response from AI
      const reply = await generateChatResponse(validatedRequest);
      
      // Return the response
      res.json({ reply });
    } catch (error) {
      console.error("Error processing chat request:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request format", details: error.errors });
      } else {
        res.status(500).json({ message: "Failed to generate response" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
