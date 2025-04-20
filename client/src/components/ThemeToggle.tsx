import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button size="icon" variant="outline" className="w-9 h-9 rounded-full"></Button>;
  }
  
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-muted w-9 h-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="fa-solid fa-sun text-foreground"></i>
      ) : (
        <i className="fa-solid fa-moon text-foreground"></i>
      )}
    </Button>
  );
}
