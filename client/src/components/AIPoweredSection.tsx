import { Button } from "@/components/ui/button";

export default function AIPoweredSection() {
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="md:w-1/2">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Your Personal <span className="text-primary">AI Fitness Trainer</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Get personalized workout plans, diet advice, and fitness tips from our AI-powered assistant. 
            Available in both English and Arabic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">View Plans</Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Fitness training" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <Button className="px-4 py-2 rounded-full flex items-center">
                <i className="fa-solid fa-play mr-2"></i> Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-card rounded-lg p-4 text-center shadow-md">
          <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
          <p className="text-muted-foreground text-sm">Workout Plans</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center shadow-md">
          <h3 className="text-4xl font-bold text-primary mb-2">10k+</h3>
          <p className="text-muted-foreground text-sm">Active Users</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center shadow-md">
          <h3 className="text-4xl font-bold text-primary mb-2">2</h3>
          <p className="text-muted-foreground text-sm">Languages</p>
        </div>
        <div className="bg-card rounded-lg p-4 text-center shadow-md">
          <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
          <p className="text-muted-foreground text-sm">AI Support</p>
        </div>
      </div>
    </section>
  );
}
