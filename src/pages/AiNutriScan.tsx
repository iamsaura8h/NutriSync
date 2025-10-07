import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Info, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function AiNutriScan() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("dishImage", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze image");

      const data = await res.json();

      if (data.error) {
        setError(data.error); // Display error message from backend
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while analyzing the image");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="bg-background flex flex-col items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-primary mb-6"
        >
          NutriScan
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`glass-card rounded-xl overflow-hidden shadow-sm w-full transition-all duration-500 ${
            result ? "max-w-6xl" : "max-w-lg"
          }`}
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Analyze Food</h2>
              <div className="text-xs px-3 py-1 bg-secondary rounded-full">
                AI Powered
              </div>
            </div>

            {/* Main Layout - Vertical on mobile, Horizontal on desktop when result exists */}
            <div
              className={`flex flex-col ${result ? "md:flex-row md:gap-8" : ""}`}
            >
              {/* Left Side: Upload/Image Section */}
              <div className={`flex-shrink-0 ${result ? "md:w-80" : "w-full"}`}>
                {!image ? (
                  <div className="flex flex-col items-center border-2 border-dashed border-primary/30 rounded-xl p-6 bg-secondary/20 mb-4 hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="food-upload"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="food-upload"
                      className="cursor-pointer flex flex-col items-center w-full"
                    >
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 hover:bg-primary/20 transition-colors">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-primary font-medium mb-1">
                        Upload Food Image
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Click to select a file
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <img
                      src={image}
                      alt="Dish Preview"
                      className="w-full md:w-80 md:h-80 rounded-lg shadow-sm object-cover mb-4"
                    />
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Try Another Dish
                    </Button>
                  </div>
                )}
              </div>

              {/* Right Side: Results Section */}
              {(loading || error || result) && (
                <div className="flex-1 mt-6 md:mt-0">
                  {loading && (
                    <div className="flex items-center justify-center text-primary gap-2 h-full">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing image...</span>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-lg text-sm flex items-start gap-2">
                      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-secondary/30 rounded-lg h-full"
                    >
                      <h2 className="text-xl font-semibold text-foreground mb-6">
                        Dish: {result.dish}
                      </h2>

                      {/* Main Nutrients */}
                      <div className="mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="p-4 bg-background rounded-lg text-center transition-all hover:shadow-md">
                            <p className="text-xs text-muted-foreground mb-1">
                              Calories
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {result.calories_per_100g}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per 100g
                            </p>
                          </div>
                          <div className="p-4 bg-background rounded-lg text-center transition-all hover:shadow-md">
                            <p className="text-xs text-muted-foreground mb-1">
                              Protein
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {result.protein_per_100g}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per 100g
                            </p>
                          </div>
                          <div className="p-4 bg-background rounded-lg text-center transition-all hover:shadow-md">
                            <p className="text-xs text-muted-foreground mb-1">
                              Carbs
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {result.carbs_per_100g}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per 100g
                            </p>
                          </div>
                          <div className="p-4 bg-background rounded-lg text-center transition-all hover:shadow-md">
                            <p className="text-xs text-muted-foreground mb-1">
                              Fat
                            </p>
                            <p className="text-lg font-bold text-primary">
                              {result.fat_per_100g}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per 100g
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Nutrients */}
                      <div className="border-t border-border pt-4">
                        <h3 className="font-semibold mb-3 text-foreground">
                          Additional Nutrients
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          <div className="p-3 bg-background rounded-lg text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Sugar
                            </p>
                            <p className="font-medium text-sm">
                              {result.sugar_per_100g}
                            </p>
                          </div>
                          <div className="p-3 bg-background rounded-lg text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Fiber
                            </p>
                            <p className="font-medium text-sm">
                              {result.fiber_per_100g}
                            </p>
                          </div>
                          <div className="p-3 bg-background rounded-lg text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Sodium
                            </p>
                            <p className="font-medium text-sm">
                              {result.sodium_per_100g}
                            </p>
                          </div>
                          <div className="p-3 bg-background rounded-lg text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Calcium
                            </p>
                            <p className="font-medium text-sm">
                              {result.calcium_per_100g}
                            </p>
                          </div>
                          <div className="p-3 bg-background rounded-lg text-center">
                            <p className="text-xs text-muted-foreground mb-1">
                              Iron
                            </p>
                            <p className="font-medium text-sm">
                              {result.iron_per_100g}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
