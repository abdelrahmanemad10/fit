import { useTheme } from "./ThemeProvider";
import { DumbbellIcon } from "./ui/dumbbell-icon";
import { SunIcon, MoonIcon, UserIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
            <DumbbellIcon className="w-6 h-6 text-black dark:text-black" />
          </div>
          <h1 className="text-xl font-bold">FitnessBlueprint</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <MoonIcon className="h-5 w-5 hidden dark:block" />
            <SunIcon className="h-5 w-5 block dark:hidden" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            className="px-3 py-1 text-sm font-medium"
          >
            {language === "en" ? "EN" : "عربي"}
          </Button>
          <Button className="bg-primary text-black font-medium rounded-full px-4 py-1.5 text-sm flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
