export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  message: string;
  language: string;
  history: Message[];
};

export type ChatResponse = {
  reply: string;
};

// Exercise types for fitness plans
export type Exercise = {
  id: string;
  title: string;
  category: string;
  description: string;
  videoId: string;
  sets: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};
