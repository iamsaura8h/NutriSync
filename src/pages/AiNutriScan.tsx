import { useState } from "react";
import { motion } from 'framer-motion';
import { Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AiNutriScan() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(URL.createObjectURL(file));
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("dishImage", file);

        try {
            const res = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                throw new Error("Failed to analyze image");
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-background flex flex-col items-center p-6">
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
                className="glass-card rounded-xl overflow-hidden shadow-sm w-full max-w-lg"
            >
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Analyze Food</h2>
                        <div className="text-xs px-3 py-1 bg-secondary rounded-full">
                            AI Powered
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center border-2 border-dashed border-primary/30 rounded-xl p-6 bg-secondary/20 mb-4">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleUpload} 
                            className="w-full cursor-pointer"
                        />
                        {image && (
                            <img 
                                src={image} 
                                alt="Dish Preview" 
                                className="w-48 mx-auto mt-4 rounded-lg shadow-sm object-cover" 
                            />
                        )}
                    </div>

                    {loading && (
                        <div className="mt-4 flex items-center justify-center text-primary gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Analyzing image...</span>
                        </div>
                    )}
                    
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
                            <h2 className="text-xl font-semibold text-foreground text-center mb-4">Dish: {result.dish}</h2>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="p-3 bg-background rounded-lg">
                                    <p className="text-sm text-muted-foreground">Calories (per 100g)</p>
                                    <p className="font-medium">{result.calories_per_100g}</p>
                                </div>
                                <div className="p-3 bg-background rounded-lg">
                                    <p className="text-sm text-muted-foreground">Protein</p>
                                    <p className="font-medium">{result.protein_per_100g}</p>
                                </div>
                                <div className="p-3 bg-background rounded-lg">
                                    <p className="text-sm text-muted-foreground">Carbs</p>
                                    <p className="font-medium">{result.carbs_per_100g}</p>
                                </div>
                                <div className="p-3 bg-background rounded-lg">
                                    <p className="text-sm text-muted-foreground">Fat</p>
                                    <p className="font-medium">{result.fat_per_100g}</p>
                                </div>
                            </div>

                            {/* Additional Nutrients */}
                            <div className="border-t border-border pt-4 mt-4">
                                <h3 className="font-bold mb-3 text-foreground">Additional Nutrients (per 100g)</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Carbohydrates:</span>
                                        <span className="font-medium">{result.carbs_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sugar:</span>
                                        <span className="font-medium">{result.sugar_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Cholesterol:</span>
                                        <span className="font-medium">{result.cholesterol_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sodium:</span>
                                        <span className="font-medium">{result.sodium_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Fiber:</span>
                                        <span className="font-medium">{result.fiber_per_100g}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vitamins */}
                            <div className="border-t border-border pt-4 mt-4">
                                <h3 className="font-bold mb-3 text-foreground">Vitamins (per 100g)</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin A:</span>
                                        <span className="font-medium">{result.vitamin_a_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B1:</span>
                                        <span className="font-medium">{result.vitamin_b1_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B2:</span>
                                        <span className="font-medium">{result.vitamin_b2_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B3:</span>
                                        <span className="font-medium">{result.vitamin_b3_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B5:</span>
                                        <span className="font-medium">{result.vitamin_b5_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B6:</span>
                                        <span className="font-medium">{result.vitamin_b6_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin B12:</span>
                                        <span className="font-medium">{result.vitamin_b12_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin C:</span>
                                        <span className="font-medium">{result.vitamin_c_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin E:</span>
                                        <span className="font-medium">{result.vitamin_e_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Vitamin K:</span>
                                        <span className="font-medium">{result.vitamin_k_per_100g}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Minerals */}
                            <div className="border-t border-border pt-4 mt-4">
                                <h3 className="font-bold mb-3 text-foreground">Minerals (per 100g)</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Calcium:</span>
                                        <span className="font-medium">{result.calcium_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Iron:</span>
                                        <span className="font-medium">{result.iron_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Magnesium:</span>
                                        <span className="font-medium">{result.magnesium_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Phosphorus:</span>
                                        <span className="font-medium">{result.phosphorus_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Potassium:</span>
                                        <span className="font-medium">{result.potassium_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Selenium:</span>
                                        <span className="font-medium">{result.selenium_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Zinc:</span>
                                        <span className="font-medium">{result.zinc_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Copper:</span>
                                        <span className="font-medium">{result.copper_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Manganese:</span>
                                        <span className="font-medium">{result.manganese_per_100g}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Folate:</span>
                                        <span className="font-medium">{result.folate_per_100g}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}