import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIPoweredSection from "@/components/AIPoweredSection";
import ChatInterface from "@/components/ChatInterface";
import FitnessPlans from "@/components/FitnessPlans";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <AIPoweredSection />
        <ChatInterface />
        <FitnessPlans />
      </main>
      <Footer />
    </div>
  );
}
