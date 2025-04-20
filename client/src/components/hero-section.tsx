import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-black to-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" 
        }}
      ></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Your Body with{" "}
            <span className="text-primary">AI Guidance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Personalized workout plans, diet advice, and real-time support from our AI trainer
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#workouts" className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md inline-block text-center">
              Start Training
            </Link>
            <Link href="#ai-chat" className="bg-transparent border border-primary text-primary font-semibold px-6 py-3 rounded-md inline-block text-center">
              Chat with AI Trainer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
