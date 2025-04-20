import { useState } from "react";
import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
            <i className="fa-solid fa-dumbbell text-primary-foreground text-xl"></i>
          </div>
          <h1 className="font-heading font-bold text-xl hidden sm:block">Fitness Blueprint</h1>
        </div>
        
        <nav className="flex items-center">
          <ul className="hidden md:flex items-center space-x-4">
            <li><Link href="/" className="px-3 py-2 rounded-md hover:bg-muted transition">Home</Link></li>
            <li><Link href="/plans" className="px-3 py-2 rounded-md hover:bg-muted transition">Plans</Link></li>
            <li><Link href="/ai-trainer" className="px-3 py-2 rounded-md text-primary hover:text-primary-dark transition">AI Trainer</Link></li>
            <li><Link href="/gallery" className="px-3 py-2 rounded-md hover:bg-muted transition">Gallery</Link></li>
            <li><Link href="/contact" className="px-3 py-2 rounded-md hover:bg-muted transition">Contact</Link></li>
          </ul>
          
          <div className="flex items-center ml-4">
            <ThemeToggle />
            
            <button 
              className="md:hidden ml-2 p-2 rounded-md bg-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-2">
            <ul className="space-y-2 py-2">
              <li><Link href="/" className="block px-3 py-2 rounded-md hover:bg-muted transition">Home</Link></li>
              <li><Link href="/plans" className="block px-3 py-2 rounded-md hover:bg-muted transition">Plans</Link></li>
              <li><Link href="/ai-trainer" className="block px-3 py-2 rounded-md text-primary hover:text-primary-dark transition">AI Trainer</Link></li>
              <li><Link href="/gallery" className="block px-3 py-2 rounded-md hover:bg-muted transition">Gallery</Link></li>
              <li><Link href="/contact" className="block px-3 py-2 rounded-md hover:bg-muted transition">Contact</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
