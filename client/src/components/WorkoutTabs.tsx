import { useState } from "react";
import { cn } from "@/lib/utils";

type WorkoutCategory = "upper" | "lower" | "full" | "hiit" | "cardio";

interface WorkoutTabsProps {
  activeCategory: WorkoutCategory;
  onCategoryChange: (category: WorkoutCategory) => void;
}

export default function WorkoutTabs({ activeCategory, onCategoryChange }: WorkoutTabsProps) {
  const categories: { id: WorkoutCategory; name: string }[] = [
    { id: "upper", name: "Upper Body" },
    { id: "lower", name: "Lower Body" },
    { id: "full", name: "Full Body" },
    { id: "hiit", name: "HIIT" },
    { id: "cardio", name: "Cardio" },
  ];

  return (
    <div className="mb-8">
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
              activeCategory === category.id
                ? "border-primary text-foreground"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-foreground hover:border-gray-300"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
