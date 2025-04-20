import { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/gemini";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PromptTemplates from "@/components/PromptTemplates";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatInterface() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    reset: resetChat
  } = useChat();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await sendMessage(message, language);
      setMessage("");
      resetTextareaHeight();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Auto-resize textarea as user types
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  
  // Reset textarea height
  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Change language
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "ar");
    document.body.style.direction = e.target.value === "ar" ? "rtl" : "ltr";
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "API Connection Error",
        description: "We're having trouble connecting to our AI service. Please check your connection and try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <section className="mb-12">
      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">AI Fitness Assistant</h2>

      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Chat with your AI Trainer</h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Language:</span>
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="bg-muted border-0 rounded py-1 px-2 text-sm focus:ring-1 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
        
        {/* Chat Messages Container */}
        <div className="h-96 overflow-y-auto p-4 flex flex-col space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {messages.length === 0 ? (
            <div className="chat-message flex flex-col bg-muted p-4 max-w-[85%] self-start rounded-lg message-in">
              <span className="text-xs text-muted-foreground mb-1">AI Trainer</span>
              <p>{language === 'en' 
                ? "👋 Hello! I'm your AI Fitness Assistant. I can help you with workout plans, diet advice, and answer fitness questions. What would you like help with today?" 
                : "👋 مرحبًا! أنا مساعدك الشخصي للياقة البدنية. يمكنني مساعدتك في خطط التمرين، ونصائح النظام الغذائي، والإجابة على أسئلة اللياقة البدنية. بماذا تريد المساعدة اليوم؟"}
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message flex flex-col p-4 max-w-[85%] rounded-lg ${
                  msg.role === "user" 
                    ? "bg-primary/20 self-end message-out" 
                    : "bg-muted self-start message-in"
                }`}
              >
                <span className="text-xs text-muted-foreground mb-1">
                  {msg.role === "user" ? (language === 'en' ? "You" : "أنت") : "AI Trainer"}
                </span>
                <div className="prose prose-sm dark:prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ 
                    __html: msg.content.replace(/\n/g, '<br />') 
                  }} 
                />
              </div>
            ))
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="chat-message flex items-center p-4 max-w-[85%] self-start">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{animationDelay: "0s"}}></div>
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{animationDelay: "0.2s"}}></div>
                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{animationDelay: "0.4s"}}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Prompt Templates */}
        <div className="px-4">
          <PromptTemplates onSelectTemplate={(template) => setMessage(template)} />
        </div>
        
        {/* Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 bg-muted rounded-lg p-2 m-4"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <textarea 
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onInput={handleInput}
            className="w-full bg-transparent border-0 focus:ring-0 resize-none h-12 py-3 px-2"
            placeholder={language === 'en' ? "Type your fitness question..." : "اكتب سؤالك عن اللياقة البدنية..."}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full flex-shrink-0"
            disabled={isLoading || !message.trim()}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </Button>
        </form>
        
        {/* API Status */}
        <div className="flex justify-between items-center px-4 pb-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span className={`inline-block w-2 h-2 rounded-full ${error ? "bg-red-500" : "bg-green-500"}`}></span>
            <span>{error ? "API Disconnected" : "API Connected"}</span>
          </div>
          <div>
            Powered by Google Gemini
          </div>
        </div>
      </Card>
    </section>
  );
}
