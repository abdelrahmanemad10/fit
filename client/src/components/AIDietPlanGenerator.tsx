import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type GoalType = "muscle-gain" | "fat-loss" | "maintenance" | "endurance";
type TrainingType = "push-pull" | "upper-lower" | "full-body";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export default function AIDietPlanGenerator() {
  const [goal, setGoal] = useState<GoalType>("muscle-gain");
  const [trainingType, setTrainingType] = useState<TrainingType>("push-pull");
  const [experience, setExperience] = useState<ExperienceLevel>("intermediate");
  const [dietRestrictions, setDietRestrictions] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePlan = async () => {
    try {
      setIsGenerating(true);
      
      // Prepare prompt for AI
      const message = `Create a detailed ${goal} diet and ${trainingType} training plan for an ${experience} level fitness enthusiast.
      ${dietRestrictions ? `Dietary restrictions/preferences: ${dietRestrictions}` : "No specific dietary restrictions."}`
      
      // Send request to API
      const response = await apiRequest("POST", "/api/chat", {
        message,
        language: "en",
        history: [],
      });
      
      // Parse response
      const data = await response.json();
      setGeneratedPlan(data.reply);
      
      toast({
        title: "Plan Generated!",
        description: "Your personalized fitness plan is ready.",
      });
    } catch (error) {
      console.error("Error generating plan:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate your plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2">AI Diet & Training Plan Generator</h2>
        <p className="text-muted-foreground">Create a personalized diet and training plan based on your goals and preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Settings</CardTitle>
            <CardDescription>Customize your fitness and nutrition plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Fitness Goal</Label>
              <Select value={goal} onValueChange={(value) => setGoal(value as GoalType)}>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Select your primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="fat-loss">Fat Loss</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="training-type">Training Style</Label>
              <Select value={trainingType} onValueChange={(value) => setTrainingType(value as TrainingType)}>
                <SelectTrigger id="training-type">
                  <SelectValue placeholder="Select training style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="push-pull">Push/Pull/Legs</SelectItem>
                  <SelectItem value="upper-lower">Upper/Lower Split</SelectItem>
                  <SelectItem value="full-body">Full Body</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experience} onValueChange={(value) => setExperience(value as ExperienceLevel)}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diet-restrictions">Dietary Restrictions (Optional)</Label>
              <Textarea 
                id="diet-restrictions"
                placeholder="E.g., vegetarian, dairy-free, gluten intolerance, etc."
                value={dietRestrictions}
                onChange={(e) => setDietRestrictions(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={generatePlan} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate My Plan"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:max-h-[600px] overflow-auto">
          <CardHeader>
            <CardTitle>Your Personalized Plan</CardTitle>
            <CardDescription>AI-generated based on your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedPlan ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: generatedPlan.replace(/\n/g, '<br />') }} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <p>Enter your preferences and click "Generate My Plan" to create a personalized diet and training regimen.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}