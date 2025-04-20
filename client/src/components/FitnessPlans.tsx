import { useState, useEffect } from "react";
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
  bodyPart: Category;
};

// All exercises data
const allExercises: Exercise[] = [
  // Upper Body Exercises
  {
    id: "1",
    title: "Bench Press",
    category: "Chest",
    description: "Build upper body strength with proper bench press technique focusing on chest, shoulders, and triceps.",
    videoId: "rT7DgCr-3pg",
    sets: "4 sets × 8-12 reps",
    level: "Intermediate",
    bodyPart: "upper"
  },
  {
    id: "2",
    title: "Pull-Ups",
    category: "Back",
    description: "Master the pull-up to build a strong back, improve posture, and develop core strength.",
    videoId: "eGo4IYlbE5g",
    sets: "3 sets × 8-10 reps",
    level: "Advanced",
    bodyPart: "upper"
  },
  {
    id: "3",
    title: "Shoulder Press",
    category: "Shoulders",
    description: "Develop stronger, broader shoulders with proper overhead pressing technique.",
    videoId: "qEwKCR5JCog",
    sets: "4 sets × 10-12 reps",
    level: "Beginner",
    bodyPart: "upper"
  },
  // Lower Body Exercises
  {
    id: "4",
    title: "Squats",
    category: "Legs",
    description: "Master the fundamental squat movement to build lower body strength and power.",
    videoId: "ultWZbUMPL8",
    sets: "4 sets × 10-15 reps",
    level: "Beginner",
    bodyPart: "lower"
  },
  {
    id: "5",
    title: "Deadlifts",
    category: "Posterior Chain",
    description: "Learn proper deadlift form to strengthen your back, glutes, and hamstrings effectively.",
    videoId: "ytGaGIn3SjE",
    sets: "3 sets × 8-10 reps",
    level: "Intermediate",
    bodyPart: "lower"
  },
  {
    id: "6",
    title: "Lunges",
    category: "Legs",
    description: "Improve balance, coordination and leg strength with proper lunge technique.",
    videoId: "3XDriUn0udo",
    sets: "3 sets × 12 reps each leg",
    level: "Beginner",
    bodyPart: "lower"
  },
  // Full Body Exercises
  {
    id: "7",
    title: "Burpees",
    category: "Full Body",
    description: "Get your heart pumping and muscles working with this effective full-body exercise.",
    videoId: "auBLPXFTSNs",
    sets: "3 sets × 10-15 reps",
    level: "Intermediate",
    bodyPart: "full"
  },
  {
    id: "8",
    title: "Kettlebell Swings",
    category: "Full Body",
    description: "Build explosive power and cardiovascular endurance with kettlebell swings.",
    videoId: "mKDIuUbH3-Y",
    sets: "3 sets × 15-20 reps",
    level: "Intermediate",
    bodyPart: "full"
  },
  {
    id: "9",
    title: "Mountain Climbers",
    category: "Full Body",
    description: "Boost your cardio and core strength with this dynamic movement.",
    videoId: "zT-9L3CEcmk",
    sets: "3 sets × 30 seconds",
    level: "Beginner",
    bodyPart: "full"
  }
];

export default function FitnessPlans() {
  const [activeCategory, setActiveCategory] = useState<Category>("upper");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  
  // Filter exercises when category changes
  useEffect(() => {
    setFilteredExercises(allExercises.filter(exercise => exercise.bodyPart === activeCategory));
  }, [activeCategory]);

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
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
        {filteredExercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="exercise-card bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-video w-full bg-muted relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${exercise.videoId}?rel=0`}
                title={`${exercise.title} tutorial`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
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
