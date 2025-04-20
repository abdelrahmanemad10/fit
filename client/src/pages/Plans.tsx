import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FitnessPlans from "@/components/FitnessPlans";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Plans() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Comprehensive <span className="text-primary">Training Plans</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Browse our extensive collection of professionally designed training plans for all fitness goals. 
            Each plan includes detailed instructions, workout videos, and progress tracking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-md border border-muted">
            <h3 className="font-bold text-xl mb-2">Upper/Lower Split</h3>
            <p className="text-muted-foreground mb-4">
              Focus on either upper or lower body muscles in each session for optimal recovery and growth.
            </p>
            <Button size="sm">Learn More</Button>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md border border-muted">
            <h3 className="font-bold text-xl mb-2">Push/Pull/Legs</h3>
            <p className="text-muted-foreground mb-4">
              Train complementary muscle groups together for efficient workouts and balanced development.
            </p>
            <Button size="sm">Learn More</Button>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md border border-muted">
            <h3 className="font-bold text-xl mb-2">Full Body Routine</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive whole body workouts ideal for beginners or those with limited training time.
            </p>
            <Button size="sm">Learn More</Button>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <FitnessPlans />
      </main>
      <Footer />
    </div>
  );
}