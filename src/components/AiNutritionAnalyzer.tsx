import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NutritionData {
  dish: string;
  portion: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

const AiNutritionAnalyzer: React.FC = () => {
  const [dish, setDish] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const [nutrition, setNutrition] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeNutrition = async () => {
    if (!dish || !portion) {
      setError("Please enter both dish name and portion size.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/analyze-nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish, portion }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setNutrition(data);
      }
    } catch (err) {
      console.error("Error fetching nutrition data:", err);
      setError("Failed to fetch nutrition data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Nutrition Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Enter dish name (e.g., Paneer Butter Masala)"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter portion size (e.g., 1 cup)"
          value={portion}
          onChange={(e) => setPortion(e.target.value)}
        />
        <Button onClick={analyzeNutrition} disabled={loading} className="w-full">
          {loading ? "Analyzing..." : "Get Nutrition Info"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {nutrition && (
          <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
            <h3 className="text-lg font-semibold">{nutrition.dish} - {nutrition.portion}</h3>
            <p>🔥 Calories: <strong>{nutrition.calories} kcal</strong></p>
            <p>💪 Protein: <strong>{nutrition.protein_g}g</strong></p>
            <p>🍞 Carbs: <strong>{nutrition.carbs_g}g</strong></p>
            <p>🥑 Fat: <strong>{nutrition.fat_g}g</strong></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiNutritionAnalyzer;
