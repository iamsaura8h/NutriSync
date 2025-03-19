import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="w-full max-w-lg mx-auto p-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Meal Planner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Enter favorite ingredients (e.g., Paneer, Broccoli)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter cuisine type (e.g., North Indian, Chinese)"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Meal type (e.g., Breakfast, Lunch, Dinner)"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Target calories (e.g., 500)"
          value={targetCalories}
          onChange={(e) => setTargetCalories(Number(e.target.value) || "")}
        />
        <Button onClick={generateMealPlan} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Get Meal Plan"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {meals.length > 0 && (
          <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
            <h3 className="text-lg font-semibold">Suggested Meals</h3>
            {meals.map((meal, index) => (
              <div key={index} className="border-b py-2">
                <h4 className="text-md font-medium">{meal.name}</h4>
                <p>🔥 Calories: <strong>{meal.calories} kcal</strong></p>
                <p>📌 {meal.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiMealPlanner;
