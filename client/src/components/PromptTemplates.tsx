import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { promptTemplates, getTemplatesByCategory, PromptTemplate } from "@/lib/promptTemplates";

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
}

export default function PromptTemplates({ onSelectTemplate }: PromptTemplatesProps) {
  const [activeCategory, setActiveCategory] = useState<PromptTemplate['category']>("training");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categories = [
    { id: "training", name: "Training", icon: "fa-solid fa-dumbbell" },
    { id: "nutrition", name: "Nutrition", icon: "fa-solid fa-utensils" },
    { id: "recovery", name: "Recovery", icon: "fa-solid fa-heart-pulse" },
    { id: "motivation", name: "Motivation", icon: "fa-solid fa-bolt" }
  ];
  
  const handleSelectTemplate = (template: string) => {
    onSelectTemplate(template);
    setIsExpanded(false);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <i className="fa-solid fa-lightbulb text-primary"></i>
          <span>Prompt Templates</span>
          <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
        </Button>
      </div>
      
      {isExpanded && (
        <Card className="border border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fitness Prompt Templates</CardTitle>
            <CardDescription>
              Choose a template to get specialized AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="training" 
              value={activeCategory}
              onValueChange={(value) => setActiveCategory(value as PromptTemplate['category'])}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <i className={category.icon}></i>
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {getTemplatesByCategory(activeCategory).map((template) => (
                    <Card 
                      key={template.id} 
                      className="bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleSelectTemplate(template.template)}
                    >
                      <CardHeader className="p-3 pb-2">
                        <div className="flex items-center gap-2">
                          <i className={`${template.icon} text-primary`}></i>
                          <CardTitle className="text-base">{template.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}