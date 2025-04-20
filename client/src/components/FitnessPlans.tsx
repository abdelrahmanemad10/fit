import { useState } from "react";
import { Button } from "@/components/ui/button";

type Category = "upper" | "lower" | "full";

type Exercise = {
  id: string;
  title: string;
  category: string;
  description: string;
  videoId: string;
  sets: string;
  level: "Beginner" | "Intermediate" | "Advanced";
};

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Bench Press",
    category: "Chest",
    description: "Build upper body strength with proper bench press technique focusing on chest, shoulders, and triceps.",
    videoId: "ZtlH0A5dlIM",
    sets: "4 sets × 8-12 reps",
    level: "Intermediate"
  },
  {
    id: "2",
    title: "Pull-Ups",
    category: "Back",
    description: "Master the pull-up to build a strong back, improve posture, and develop core strength.",
    videoId: "Ie5otP0U72w",
    sets: "3 sets × 8-10 reps",
    level: "Advanced"
  },
  {
    id: "3",
    title: "Shoulder Press",
    category: "Shoulders",
    description: "Develop stronger, broader shoulders with proper overhead pressing technique.",
    videoId: "dVwT81iZz9Y",
    sets: "4 sets × 10-12 reps",
    level: "Beginner"
  }
];

export default function FitnessPlans() {
  const [activeCategory, setActiveCategory] = useState<Category>("upper");

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl">Training Plans</h2>
        <div className="flex space-x-2">
          <Button 
            variant={activeCategory === "upper" ? "default" : "ghost"}
            onClick={() => setActiveCategory("upper")}
            size="sm"
          >
            Upper Body
          </Button>
          <Button 
            variant={activeCategory === "lower" ? "default" : "ghost"}
            onClick={() => setActiveCategory("lower")}
            size="sm"
          >
            Lower Body
          </Button>
          <Button 
            variant={activeCategory === "full" ? "default" : "ghost"}
            onClick={() => setActiveCategory("full")}
            size="sm"
          >
            Full Body
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="exercise-card bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-video w-full bg-muted">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${exercise.videoId}`}
                title={`${exercise.title} tutorial`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
                className="w-full h-full object-cover"
              ></iframe>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{exercise.title}</h3>
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                  {exercise.category}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{exercise.description}</p>
              <div className="flex justify-between text-sm">
                <span>{exercise.sets}</span>
                <span className="text-primary font-medium">{exercise.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline">
          View All Exercises
        </Button>
      </div>
    </section>
  );
}
