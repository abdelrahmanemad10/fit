import HeroSection from "@/components/hero-section";
import WorkoutSection from "@/components/workout-section";
import WeeklySchedule from "@/components/weekly-schedule";
import SubscriptionPlans from "@/components/subscription-plans";
import AIChatSection from "@/components/ai-chat-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkoutSection />
      <WeeklySchedule />
      <SubscriptionPlans />
      <AIChatSection />
    </main>
  );
}
