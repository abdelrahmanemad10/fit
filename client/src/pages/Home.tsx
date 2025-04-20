import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIPoweredSection from "@/components/AIPoweredSection";
import ChatInterface from "@/components/ChatInterface";
import FitnessPlans from "@/components/FitnessPlans";
import AIDietPlanGenerator from "@/components/AIDietPlanGenerator";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <AIPoweredSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ChatInterface />
          <AIDietPlanGenerator />
        </div>
        <Separator className="my-8" />
        <FitnessPlans />
      </main>
      <Footer />
    </div>
  );
}
