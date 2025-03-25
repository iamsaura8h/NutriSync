
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Utensils, Pizza, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Meal {
  name: string;
  calories: number;
  description: string;
}

const AiMealPlanner: React.FC = () => {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [targetCalories, setTargetCalories] = useState<number | "">("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMealPlan = async () => {
    if (!ingredients || !cuisine || !mealType || !targetCalories) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/generate-meal-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, cuisine, mealType, targetCalories }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMeals(data.meals);
      }
    } catch (err) {
      console.error("Error fetching meal plan:", err);
      setError("Failed to generate meal plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 px-1">
      <div className="text-sm text-muted-foreground mb-4">
        Enter your preferences to generate AI-powered meal recommendations tailored to your taste.
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="ingredients" className="text-sm font-medium">Favorite Ingredients</label>
          <Input
            id="ingredients"
            type="text"
            placeholder="e.g., Paneer, Broccoli, Quinoa"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="cuisine" className="text-sm font-medium">Cuisine Type</label>
          <Input
            id="cuisine"
            type="text"
            placeholder="e.g., North Indian, Chinese, Mediterranean"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="mealType" className="text-sm font-medium">Meal Type</label>
          <Input
            id="mealType"
            type="text"
            placeholder="e.g., Breakfast, Lunch, Dinner"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="targetCalories" className="text-sm font-medium">Target Calories</label>
          <Input
            id="targetCalories"
            type="number"
            placeholder="e.g., 500"
            value={targetCalories}
            onChange={(e) => setTargetCalories(Number(e.target.value) || "")}
          />
        </div>
      </div>
      
      <Button onClick={generateMealPlan} disabled={loading} className="w-full">
        {loading ? (
          <>Generating...</>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Meal Plan
          </>
        )}
      </Button>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      {meals.length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Suggested Meals
          </h3>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Pizza className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center mb-1">
                      <h4 className="font-medium text-base">{meal.name}</h4>
                      <Badge variant="outline" className="ml-auto">
                        {meal.calories} kcal
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <Card className="bg-secondary/20 border-0">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  These meal suggestions are AI-generated based on your preferences. Please consider any personal dietary 
                  restrictions or allergies before preparing these meals. For precise nutritional advice, consult a dietitian.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AiMealPlanner;
