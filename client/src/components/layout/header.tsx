import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/ui/theme-provider";
import Logo from "@/components/logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold">
            Fitness<span className="text-primary">Blueprint</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#workouts" className="font-medium hover:text-primary transition-colors">
            Workouts
          </Link>
          <Link href="#schedule" className="font-medium hover:text-primary transition-colors">
            Schedule
          </Link>
          <Link href="#plans" className="font-medium hover:text-primary transition-colors">
            Plans
          </Link>
          <Link href="#ai-chat" className="font-medium hover:text-primary transition-colors">
            AI Trainer
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <i className={`fas fa-${theme === "dark" ? "moon" : "sun"}`}></i>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? "" : "hidden"} md:hidden bg-black/95 border-b border-gray-800`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            href="#workouts" 
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Workouts
          </Link>
          <Link 
            href="#schedule" 
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Schedule
          </Link>
          <Link 
            href="#plans" 
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Plans
          </Link>
          <Link 
            href="#ai-chat" 
            className="font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            AI Trainer
          </Link>
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <i className={`fas fa-${theme === "dark" ? "moon" : "sun"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
