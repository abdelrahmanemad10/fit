// Prompt Templates for different fitness scenarios

export type PromptTemplate = {
  id: string;
  title: string;
  description: string;
  template: string;
  category: 'training' | 'nutrition' | 'recovery' | 'motivation';
  icon: string;
};

export const promptTemplates: PromptTemplate[] = [
  // Training Templates
  {
    id: "training-beginner",
    title: "Beginner Workout Plan",
    description: "Get a personalized workout plan for beginners",
    template: "I'm a beginner in fitness with limited experience. Can you create a simple 3-day workout plan that focuses on full-body exercises using minimal equipment? I'd like clear instructions for each exercise and appropriate sets/reps for a beginner.",
    category: "training",
    icon: "fa-solid fa-dumbbell"
  },
  {
    id: "training-intermediate",
    title: "Intermediate Split Plan",
    description: "Get a customized training split routine",
    template: "I've been working out consistently for about a year and want to progress. Can you create a 4-day training split (upper/lower or push/pull/legs) that includes compound and isolation exercises? Please include appropriate sets, reps, and rest periods for someone at the intermediate level.",
    category: "training",
    icon: "fa-solid fa-dumbbell"
  },
  {
    id: "training-advanced",
    title: "Advanced Program",
    description: "Get an advanced periodized program",
    template: "I've been training for several years and want to take it to the next level. Can you create a 5-day advanced training program with periodization that includes strength, hypertrophy, and power phases? I'd like specific exercises, sets/reps schemes, and progression strategies over a 12-week period.",
    category: "training",
    icon: "fa-solid fa-dumbbell"
  },
  {
    id: "training-hiit",
    title: "HIIT Workout",
    description: "Get a high-intensity interval training session",
    template: "I'm looking for an effective HIIT workout to improve my cardiovascular fitness and burn fat. Can you create a 20-30 minute HIIT routine with exercises that require minimal equipment? Please include work/rest ratios and modifications for different fitness levels.",
    category: "training",
    icon: "fa-solid fa-fire"
  },
  {
    id: "training-home",
    title: "Home Workout",
    description: "Get a no-equipment home workout",
    template: "I need a home workout plan that doesn't require any equipment. Can you create a full-body routine I can do 3-4 times per week using just my body weight? Please include exercise descriptions, sets/reps, and progression options.",
    category: "training",
    icon: "fa-solid fa-house"
  },
  
  // Nutrition Templates
  {
    id: "nutrition-weight-loss",
    title: "Weight Loss Meal Plan",
    description: "Get a meal plan for weight loss",
    template: "I'm trying to lose weight in a healthy, sustainable way. Can you create a 7-day meal plan with a moderate caloric deficit (about 500 calories below maintenance)? Please include 3 meals and 2 snacks per day with simple recipes and a grocery list. I prefer whole foods and have no dietary restrictions.",
    category: "nutrition",
    icon: "fa-solid fa-utensils"
  },
  {
    id: "nutrition-muscle-gain",
    title: "Muscle Building Diet",
    description: "Get a high-protein diet for muscle growth",
    template: "I'm focusing on building muscle and strength. Can you create a high-protein meal plan with a slight caloric surplus (about 300-500 calories above maintenance)? Please include meal timing suggestions around workouts, protein requirements, and example meals for a 7-day period.",
    category: "nutrition",
    icon: "fa-solid fa-drumstick-bite"
  },
  {
    id: "nutrition-vegetarian",
    title: "Vegetarian Fitness Diet",
    description: "Get a plant-based fitness nutrition plan",
    template: "I follow a vegetarian diet and am looking to improve my fitness. Can you create a 7-day meal plan that provides adequate protein and nutrients for recovery and performance? Please include protein sources, meal ideas, and any supplements I should consider.",
    category: "nutrition",
    icon: "fa-solid fa-seedling"
  },
  {
    id: "nutrition-intermittent",
    title: "Intermittent Fasting Guide",
    description: "Get a plan for intermittent fasting",
    template: "I'd like to try intermittent fasting for weight management and health benefits. Can you explain the different intermittent fasting protocols (16/8, 5:2, etc.), their benefits, and provide a sample meal plan? Also, how should I adjust my eating window around my workouts for optimal performance?",
    category: "nutrition",
    icon: "fa-solid fa-clock"
  },
  {
    id: "nutrition-macros",
    title: "Macro Calculator",
    description: "Get personalized macronutrient targets",
    template: "I want to track my macronutrients for my fitness goals. Can you help me calculate appropriate macros (protein, carbs, fat) based on my goal of [weight loss/maintenance/muscle gain]? I'd also like advice on meal timing and food sources to meet these targets.",
    category: "nutrition",
    icon: "fa-solid fa-calculator"
  },
  
  // Recovery Templates
  {
    id: "recovery-stretching",
    title: "Stretching Routine",
    description: "Get a comprehensive stretching program",
    template: "I need a good stretching routine to improve my flexibility and recovery. Can you create a 15-20 minute stretching program I can do after workouts or on rest days? Please include stretches for all major muscle groups, how long to hold each stretch, and the proper technique.",
    category: "recovery",
    icon: "fa-solid fa-person-walking"
  },
  {
    id: "recovery-sleep",
    title: "Sleep Optimization",
    description: "Get tips for better sleep quality",
    template: "I'm having trouble getting enough quality sleep, which is affecting my workout recovery. Can you provide strategies for improving sleep quality and duration? I'd like advice on bedtime routines, optimal sleep environment, and any supplements that might help.",
    category: "recovery",
    icon: "fa-solid fa-moon"
  },
  {
    id: "recovery-injury",
    title: "Injury Rehabilitation",
    description: "Get a safe return-to-training plan",
    template: "I'm recovering from a [specific injury - e.g., pulled hamstring] and want to safely return to training. Can you provide a progressive plan for rehabilitation, including appropriate exercises, mobility work, and when to start reintroducing regular training? I want to avoid re-injury but don't want to lose too much progress.",
    category: "recovery",
    icon: "fa-solid fa-bandage"
  },
  {
    id: "recovery-mobility",
    title: "Mobility Workout",
    description: "Get a joint mobility improvement routine",
    template: "I want to improve my overall joint mobility to enhance my performance and prevent injuries. Can you create a comprehensive mobility routine targeting all major joints (ankles, hips, shoulders, etc.)? Please include specific drills, how long to perform each, and how often I should do this routine.",
    category: "recovery",
    icon: "fa-solid fa-arrows-up-down-left-right"
  },
  
  // Motivation Templates
  {
    id: "motivation-goals",
    title: "Goal Setting",
    description: "Get help setting SMART fitness goals",
    template: "I want to set effective fitness goals but struggle with making them realistic and measurable. Can you help me create SMART goals for my fitness journey over the next 3, 6, and 12 months? Also, how can I track progress beyond just weight and stay motivated when I don't see immediate results?",
    category: "motivation",
    icon: "fa-solid fa-bullseye"
  },
  {
    id: "motivation-plateau",
    title: "Breaking Plateaus",
    description: "Get strategies to overcome fitness plateaus",
    template: "I've hit a plateau in my [strength/weight loss/muscle gain] progress after consistent progress for several months. Can you suggest strategies to break through this plateau? I'm looking for training adjustments, nutrition changes, or recovery techniques that might help me start making progress again.",
    category: "motivation",
    icon: "fa-solid fa-chart-line"
  },
  {
    id: "motivation-habit",
    title: "Habit Building",
    description: "Get techniques for building consistent habits",
    template: "I struggle with consistency in my fitness routine. Can you provide strategies for building lasting fitness habits? I'd like practical advice on overcoming common obstacles, setting up systems for success, and how to get back on track after missing workouts.",
    category: "motivation",
    icon: "fa-solid fa-check-double"
  },
  {
    id: "motivation-mindset",
    title: "Mindset Training",
    description: "Get mental techniques for fitness success",
    template: "I want to develop a stronger mindset for my fitness journey. Can you suggest mental training techniques, affirmations, visualization practices, or cognitive strategies to overcome mental barriers during tough workouts and stay committed to my long-term goals?",
    category: "motivation",
    icon: "fa-solid fa-brain"
  }
];

// Helper function to get templates by category
export const getTemplatesByCategory = (category: PromptTemplate['category']) => {
  return promptTemplates.filter(template => template.category === category);
};

// Helper function to get a specific template by ID
export const getTemplateById = (id: string) => {
  return promptTemplates.find(template => template.id === id);
};