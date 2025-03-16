import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Sun, Moon, Utensils, Upload, Loader2, Info } from 'lucide-react';
// import axios from 'axios';

interface NutritionData {
  dish: string;
  calories_per_100g: string;
  protein_per_100g: string;
  carbs_per_100g: string;
  fat_per_100g: string;
  fiber_per_100g: string;
  sugar_per_100g: string;
  cholesterol_per_100g: string;
  sodium_per_100g: string;
  [key: string]: string; // For other nutrition properties
}

interface MealRecommendation {
  name: string;
  icon: React.ReactNode;
  items: string[];
  delay: number;
}

const FoodAnalysisComponent: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mealRecommendations, setMealRecommendations] = useState<MealRecommendation[] | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
    setMealRecommendations(null);
  };

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result?.toString().split(',')[1];
        
        if (!base64Image) {
          throw new Error("Failed to convert image");
        }

        // This would typically be your backend API call, but we're simulating the response
        // In a real implementation, you would call your server endpoint
        // For demo purposes, we'll simulate a response based on imaginary analysis
        
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock response (in a real app, this would come from your API)
        const mockResult: NutritionData = {
          dish: "Vegetable Biryani",
          calories_per_100g: "150-180 kcal",
          protein_per_100g: "4-6 g",
          carbs_per_100g: "25-30 g",
          fat_per_100g: "5-7 g",
          fiber_per_100g: "2-3 g",
          sugar_per_100g: "1-2 g",
          cholesterol_per_100g: "0-5 mg",
          sodium_per_100g: "300-400 mg",
          vitamin_a_per_100g: "200-300 IU",
          vitamin_c_per_100g: "15-20 mg",
          calcium_per_100g: "30-40 mg",
          iron_per_100g: "1-2 mg"
        };
        
        setResult(mockResult);
        
        // Generate meal recommendations based on the analyzed dish
        generateMealRecommendations(mockResult);
      };
    } catch (err: any) {
      setError(err.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  const generateMealRecommendations = (nutritionData: NutritionData) => {
    // In a real app, this would use Gemini API to generate meal recommendations
    // based on the nutrition data of the analyzed dish
    
    // For demo purposes, we're creating static recommendations
    const recommendations: MealRecommendation[] = [
      {
        name: "Breakfast",
        icon: <Coffee className="h-5 w-5 text-primary" />,
        items: [
          "Masala Dosa with Coconut Chutney",
          "Vegetable Upma",
          "Mixed Fruit Smoothie with Nuts"
        ],
        delay: 0.1
      },
      {
        name: "Lunch",
        icon: <Sun className="h-5 w-5 text-primary" />,
        items: [
          nutritionData.dish, // The analyzed dish
          "Dal Tadka",
          "Cucumber Raita",
          "Whole Wheat Roti"
        ],
        delay: 0.2
      },
      {
        name: "Snacks",
        icon: <Utensils className="h-5 w-5 text-primary" />,
        items: [
          "Roasted Chana with Spices",
          "Cucumber and Carrot Sticks",
          "Masala Chai"
        ],
        delay: 0.3
      },
      {
        name: "Dinner",
        icon: <Moon className="h-5 w-5 text-primary" />,
        items: [
          "Vegetable Khichdi",
          "Grilled Paneer Tikka",
          "Mixed Vegetable Salad",
          "Buttermilk"
        ],
        delay: 0.4
      }
    ];
    
    setMealRecommendations(recommendations);
  };

  const MealCard: React.FC<{ meal: MealRecommendation }> = ({ meal }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: meal.delay }}
      className="bg-background rounded-xl p-5 shadow-sm"
    >
      <div className="flex items-start space-x-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {meal.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-base mb-2">{meal.name}</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {meal.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto max-w-4xl py-8"
    >
      <motion.div
        className="glass-card rounded-xl overflow-hidden shadow-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">NutriScan</h2>
              <p className="text-muted-foreground">Upload a food image to get meal recommendations</p>
            </div>
            <div className="text-xs px-3 py-1 bg-secondary rounded-full">
              AI Powered
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-xl p-6 bg-secondary/20">
            <input 
              type="file" 
              id="imageUpload"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            {!image ? (
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-primary font-medium">Upload Food Image</p>
                  <p className="text-muted-foreground text-sm mt-1">Click to select a file</p>
                </div>
              </label>
            ) : (
              <div className="w-full flex flex-col items-center">
                <img 
                  src={image} 
                  alt="Food Preview" 
                  className="w-64 h-64 object-cover rounded-lg shadow-md mb-4" 
                />
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setImage(null);
                      setFile(null);
                      setResult(null);
                      setMealRecommendations(null);
                    }}
                  >
                    Change Image
                  </Button>
                  <Button 
                    onClick={analyzeImage} 
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg text-sm flex items-start gap-2">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-secondary/30 rounded-lg"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Nutrition Analysis
              </h3>
              
              <div className="mt-3">
                <p className="font-medium text-lg">{result.dish}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  <div className="p-3 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Calories</p>
                    <p className="font-medium">{result.calories_per_100g}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="font-medium">{result.protein_per_100g}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="font-medium">{result.carbs_per_100g}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="font-medium">{result.fat_per_100g}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {mealRecommendations && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden shadow-sm"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Meal Recommendations</h2>
                <p className="text-muted-foreground mt-1">Based on your {result?.dish}</p>
              </div>
              <div className="text-xs px-3 py-1 bg-secondary rounded-full">
                AI Generated
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              Here are some balanced meal suggestions that complement your {result?.dish}:
            </p>

            <div className="space-y-4">
              {mealRecommendations.map((meal, index) => (
                <MealCard key={index} meal={meal} />
              ))}
            </div>

            <div className="mt-6 bg-secondary/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Note:</span> These meal recommendations are generated by AI based on the nutritional analysis of your food image. For personalized meal plans, please consult with a nutritionist.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FoodAnalysisComponent;