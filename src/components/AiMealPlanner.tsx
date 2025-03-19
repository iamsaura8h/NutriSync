
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Utensils, Pizza } from "lucide-react";

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
      const response = await fetch("http://localhost:5000/generate-meal-plan", {
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
    <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Meal Planner
        </CardTitle>
        <CardDescription>
          Personalized meal suggestions powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          Enter your preferences to generate AI-powered meal recommendations.
        </div>
        <Input
          type="text"
          placeholder="Enter favorite ingredients (e.g., Paneer, Broccoli)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Enter cuisine type (e.g., North Indian, Chinese)"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Meal type (e.g., Breakfast, Lunch, Dinner)"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Target calories (e.g., 500)"
          value={targetCalories}
          onChange={(e) => setTargetCalories(Number(e.target.value) || "")}
          className="mb-4"
        />
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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {meals.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Suggested Meals
            </h3>
            <div className="space-y-3">
              {meals.map((meal, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-background rounded-xl p-4 shadow-sm border border-border"
                >
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Pizza className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">{meal.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
                      <p className="text-sm font-medium mt-2">🔥 {meal.calories} kcal</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiMealPlanner;
