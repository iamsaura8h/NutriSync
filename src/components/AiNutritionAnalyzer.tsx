
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Sparkles, Info, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface NutritionData {
  dish: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
}

const AiNutritionAnalyzer = () => {
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addingToLog, setAddingToLog] = useState(false);
  const [added, setAdded] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const analyzeFood = async () => {
    if (!description) {
      setError("Please enter a food description.");
      return;
    }

    setLoading(true);
    setError(null);
    setAdded(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze-nutrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish: description, portion: "1 serving" }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze food");
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult({
          dish: data.dish,
          food_name: data.dish,
          calories: data.calories || 0,
          protein: data.protein_g || 0,
          carbs: data.carbs_g || 0,
          fat: data.fat_g || 0,
          meal_type: mealType,
        });
      }
    } catch (err) {
      console.error("Error analyzing food:", err);
      setError("Failed to analyze food. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFoodLog = async () => {
    if (!user || !result) return;
    
    setAddingToLog(true);
    
    try {
      const { error } = await supabase
        .from('food_entries')
        .insert([
          { 
            user_id: user.id,
            food_name: result.food_name,
            calories: result.calories || 0,
            protein: result.protein || 0,
            carbs: result.carbs || 0,
            fat: result.fat || 0,
            meal_type: result.meal_type,
            portion_size: 1,
            portion_unit: 'serving'
          }
        ]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Food added to your daily log!",
      });
      
      setAdded(true);
    } catch (error: any) {
      console.error('Error adding food:', error);
      toast({
        title: 'Error',
        description: 'Failed to add food. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAddingToLog(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Describe a dish or meal and our AI will analyze its nutritional content:
      </div>
      
      <div className="space-y-2">
        <label htmlFor="meal_type" className="text-sm font-medium">Meal Type</label>
        <select
          id="meal_type"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>
      
      <Textarea
        placeholder="Describe your food or meal (e.g., 'A bowl of Chicken Biryani with raita')"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="resize-none"
      />
      
      <Button 
        onClick={analyzeFood} 
        disabled={loading} 
        className="w-full"
      >
        {loading ? (
          "Analyzing..."
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze Nutrition
          </>
        )}
      </Button>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 border rounded-lg p-4 bg-secondary/20"
        >
          <h3 className="font-medium text-lg mb-3">Analysis Results</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Food:</span>
              <span className="font-medium">{result.dish}</span>
            </div>
            <div className="flex justify-between">
              <span>Calories:</span>
              <span className="font-medium">{result.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Protein:</span>
              <span className="font-medium">{result.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span>Carbs:</span>
              <span className="font-medium">{result.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fat:</span>
              <span className="font-medium">{result.fat}g</span>
            </div>
            <div className="flex justify-between">
              <span>Meal Type:</span>
              <span className="font-medium capitalize">{result.meal_type}</span>
            </div>
          </div>
          
          <div className="mt-4">
            {added ? (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border-primary/20" 
                disabled
              >
                <Check className="h-4 w-4" />
                Added to Daily Log
              </Button>
            ) : (
              <Button 
                onClick={addToFoodLog} 
                className="w-full" 
                disabled={addingToLog}
              >
                {addingToLog ? "Adding..." : "Add to Daily Log"}
              </Button>
            )}
          </div>
          
          <div className="mt-3 bg-secondary/30 p-3 rounded-md text-xs flex items-start gap-2">
            <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              AI analysis provides an estimate. Actual nutritional content may vary based on specific ingredients and preparation methods.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AiNutritionAnalyzer;
