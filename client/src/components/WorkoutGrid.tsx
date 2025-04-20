import { useEffect, useState } from "react";
import { Play, Clock } from "lucide-react";
import { Exercise } from "@/types/exercises";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface WorkoutGridProps {
  category: string;
}

export default function WorkoutGrid({ category }: WorkoutGridProps) {
  const { data: exercises, isLoading, isError } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises", category],
  });

  if (isLoading) {
    return <WorkoutGridSkeleton />;
  }

  if (isError || !exercises) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-500">Error loading exercises</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn't load the exercises. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 bg-gray-300 dark:bg-gray-700 relative">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${exercise.imageUrl})` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
                  onClick={() => window.open(exercise.videoUrl, '_blank')}
                  aria-label="Play video"
                >
                  <Play className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">{exercise.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{exercise.sets} sets x {exercise.reps} reps</p>
              <div className="flex justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{exercise.duration} min</span>
                </div>
                <div className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-medium">
                  {exercise.level}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-6 py-2.5">
          View All Exercises
        </Button>
      </div>
    </>
  );
}

function WorkoutGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <Skeleton className="w-full h-48" />
          <div className="p-5">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
