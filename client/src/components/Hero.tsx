import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center", 
        }}
      >
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col items-start">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Your AI <span className="text-primary">Fitness</span> Partner</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">Personalized training plans, nutrition advice, and fitness coaching powered by advanced AI.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-primary text-black hover:bg-primary/90 font-bold rounded-full px-8 py-3">
            Start Training
          </Button>
          <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-full px-8 py-3">
            View Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
