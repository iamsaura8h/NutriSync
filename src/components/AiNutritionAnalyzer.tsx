
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Pizza } from "lucide-react";

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
    <Card className="w-full h-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Nutrition Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          Enter a dish name and portion size to get AI-analyzed nutrition information.
        </div>
        <Input
          type="text"
          placeholder="Enter dish name (e.g., Paneer Butter Masala)"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Enter portion size (e.g., 1 cup)"
          value={portion}
          onChange={(e) => setPortion(e.target.value)}
          className="mb-4"
        />
        <Button onClick={analyzeNutrition} disabled={loading} className="w-full">
          {loading ? (
            <>Analyzing...</>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Nutrition Info
            </>
          )}
        </Button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {nutrition && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-4 bg-secondary/50 rounded-lg"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Pizza className="h-5 w-5 text-primary" />
              {nutrition.dish} - {nutrition.portion}
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center gap-2 bg-background p-2 rounded-md">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">🔥</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                  <div className="font-semibold">{nutrition.calories} kcal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-background p-2 rounded-md">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">💪</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                  <div className="font-semibold">{nutrition.protein_g}g</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-background p-2 rounded-md">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">🍞</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                  <div className="font-semibold">{nutrition.carbs_g}g</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-background p-2 rounded-md">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm">🥑</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                  <div className="font-semibold">{nutrition.fat_g}g</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiNutritionAnalyzer;
