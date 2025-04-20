import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Category = "upper" | "lower" | "full" | "push" | "pull" | "legs";

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
  },
  // Push Exercises (Chest, Shoulders, Triceps)
  {
    id: "10",
    title: "Incline Bench Press",
    category: "Chest",
    description: "Target the upper chest with this angled pressing movement for complete chest development.",
    videoId: "SrqOu55lrYU",
    sets: "4 sets × 8-10 reps",
    level: "Intermediate",
    bodyPart: "push"
  },
  {
    id: "11",
    title: "Dips",
    category: "Chest/Triceps",
    description: "A compound exercise that targets chest, triceps, and shoulders for upper body pushing strength.",
    videoId: "2z8JISAQVDk",
    sets: "3 sets × 8-12 reps",
    level: "Intermediate",
    bodyPart: "push"
  },
  {
    id: "12",
    title: "Lateral Raises",
    category: "Shoulders",
    description: "Isolate and develop the lateral deltoids for broader, more defined shoulders.",
    videoId: "3VcKaXpzqRo",
    sets: "3 sets × 12-15 reps",
    level: "Beginner",
    bodyPart: "push"
  },
  // Pull Exercises (Back, Biceps)
  {
    id: "13",
    title: "Bent Over Rows",
    category: "Back",
    description: "Develop a strong, thick back with this fundamental pulling exercise.",
    videoId: "FWJR5Ve8PoE",
    sets: "4 sets × 8-10 reps",
    level: "Intermediate",
    bodyPart: "pull"
  },
  {
    id: "14",
    title: "Lat Pulldowns",
    category: "Back",
    description: "Target your lats with this machine-based pulling exercise for a wider back.",
    videoId: "1fKkScZAGDI",
    sets: "3 sets × 10-12 reps",
    level: "Beginner",
    bodyPart: "pull"
  },
  {
    id: "15",
    title: "Bicep Curls",
    category: "Arms",
    description: "Isolate and build your biceps with proper curling technique for impressive arms.",
    videoId: "ykJmrZ5v0Oo",
    sets: "3 sets × 12-15 reps",
    level: "Beginner",
    bodyPart: "pull"
  },
  // Legs Exercises
  {
    id: "16",
    title: "Leg Press",
    category: "Quads",
    description: "Build quad strength and size with this machine-based leg exercise.",
    videoId: "IZxyjW7MPJQ",
    sets: "4 sets × 10-12 reps",
    level: "Beginner",
    bodyPart: "legs"
  },
  {
    id: "17",
    title: "Romanian Deadlift",
    category: "Hamstrings",
    description: "Target the hamstrings and glutes with this hip-hinge movement for posterior chain development.",
    videoId: "jEy_czb3RVA",
    sets: "3 sets × 8-10 reps",
    level: "Intermediate",
    bodyPart: "legs"
  },
  {
    id: "18",
    title: "Calf Raises",
    category: "Calves",
    description: "Develop your calf muscles with this simple but effective isolation exercise.",
    videoId: "wxwY7GXxL4k",
    sets: "4 sets × 15-20 reps",
    level: "Beginner",
    bodyPart: "legs"
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
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl">Training Plans</h2>
        
        <Tabs 
          defaultValue="upper-lower" 
          className="w-full"
          onValueChange={(value) => {
            // Set the appropriate initial category based on the selected tab
            if (value === "upper-lower") {
              setActiveCategory("upper");
            } else if (value === "push-pull") {
              setActiveCategory("push");
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upper-lower">Upper/Lower Split</TabsTrigger>
            <TabsTrigger value="push-pull">Push/Pull/Legs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upper-lower" className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant={activeCategory === "upper" ? "default" : "outline"}
                onClick={() => setActiveCategory("upper")}
                size="sm"
                className="rounded-full"
              >
                Upper Body
              </Button>
              <Button 
                variant={activeCategory === "lower" ? "default" : "outline"}
                onClick={() => setActiveCategory("lower")}
                size="sm"
                className="rounded-full"
              >
                Lower Body
              </Button>
              <Button 
                variant={activeCategory === "full" ? "default" : "outline"}
                onClick={() => setActiveCategory("full")}
                size="sm"
                className="rounded-full"
              >
                Full Body
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="push-pull" className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant={activeCategory === "push" ? "default" : "outline"}
                onClick={() => setActiveCategory("push")}
                size="sm"
                className="rounded-full"
              >
                Push (Chest/Shoulders/Triceps)
              </Button>
              <Button 
                variant={activeCategory === "pull" ? "default" : "outline"}
                onClick={() => setActiveCategory("pull")}
                size="sm"
                className="rounded-full"
              >
                Pull (Back/Biceps)
              </Button>
              <Button 
                variant={activeCategory === "legs" ? "default" : "outline"}
                onClick={() => setActiveCategory("legs")}
                size="sm"
                className="rounded-full"
              >
                Legs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="exercise-card bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-muted"
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
        <Link href="/plans">
          <Button variant="outline">
            View All Exercises
          </Button>
        </Link>
      </div>
    </section>
  );
}
