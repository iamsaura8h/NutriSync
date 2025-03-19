import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Target, Plus, Minus, ListFilter, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AiNutritionAnalyzer from './AiNutritionAnalyzer';

interface NutritionGoal {
  daily_calories: number;
  daily_protein: number;
  daily_carbs: number;
  daily_fat: number;
}

interface FoodEntry {
  id: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
}

const DEFAULT_GOALS = {
  daily_calories: 2000,
  daily_protein: 120,
  daily_carbs: 200,
  daily_fat: 65
};

const NutritionGoals: React.FC = () => {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showFoodDialog, setShowFoodDialog] = useState(false);
  const [goals, setGoals] = useState<NutritionGoal>(DEFAULT_GOALS);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("manual");
  const [newFood, setNewFood] = useState({
    food_name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    meal_type: 'breakfast',
    portion_size: '1',
    portion_unit: 'serving'
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchNutritionGoals();
      fetchTodaysFoodEntries();
    }
  }, [user]);

  const fetchNutritionGoals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('nutrition_goals')
        .select('daily_calories, daily_protein, daily_carbs, daily_fat')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setGoals(data);
      } else {
        setShowGoalDialog(true);
      }
    } catch (error: any) {
      console.error('Error fetching nutrition goals:', error);
    }
  };

  const fetchTodaysFoodEntries = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      const { data, error } = await supabase
        .from('food_entries')
        .select('id, food_name, calories, protein, carbs, fat, meal_type')
        .eq('user_id', user.id)
        .eq('entry_date', today);

      if (error) throw error;

      setFoodEntries(data || []);
    } catch (error: any) {
      console.error('Error fetching food entries:', error);
    }
  };

  const handleSaveGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to set nutrition goals',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('nutrition_goals')
        .upsert({
          user_id: user.id,
          ...goals,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: 'Goals saved',
        description: 'Your nutrition goals have been updated!',
      });

      setShowGoalDialog(false);
    } catch (error: any) {
      console.error('Error saving nutrition goals:', error);
      toast({
        title: 'Error',
        description: 'Failed to save goals. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFood = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to track food',
        variant: 'destructive',
      });
      return;
    }

    if (!newFood.food_name) {
      toast({
        title: 'Missing information',
        description: 'Please enter a food name',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('food_entries')
        .insert([
          { 
            user_id: user.id,
            food_name: newFood.food_name,
            calories: Number(newFood.calories) || 0,
            protein: Number(newFood.protein) || 0,
            carbs: Number(newFood.carbs) || 0,
            fat: Number(newFood.fat) || 0,
            meal_type: newFood.meal_type,
            portion_size: Number(newFood.portion_size) || 1,
            portion_unit: newFood.portion_unit
          }
        ]);

      if (error) throw error;

      toast({
        title: 'Food added',
        description: `${newFood.food_name} has been added to your log!`,
      });

      setNewFood({
        food_name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        meal_type: 'breakfast',
        portion_size: '1',
        portion_unit: 'serving'
      });

      fetchTodaysFoodEntries();
      setShowFoodDialog(false);
    } catch (error: any) {
      console.error('Error adding food:', error);
      toast({
        title: 'Error',
        description: 'Failed to add food. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFoodEntry = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('food_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Food removed',
        description: 'Food entry has been removed from your log',
      });

      fetchTodaysFoodEntries();
    } catch (error: any) {
      console.error('Error removing food entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove food entry',
        variant: 'destructive',
      });
    }
  };

  const totals = foodEntries.reduce((acc, entry) => {
    return {
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const percentages = {
    calories: Math.min(100, (totals.calories / goals.daily_calories) * 100),
    protein: Math.min(100, (totals.protein / goals.daily_protein) * 100),
    carbs: Math.min(100, (totals.carbs / goals.daily_carbs) * 100),
    fat: Math.min(100, (totals.fat / goals.daily_fat) * 100)
  };

  return (
    <>
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Set Nutrition Goals
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSaveGoals} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="daily_calories">Daily Calories (kcal)</Label>
              <Input
                id="daily_calories"
                type="number"
                value={goals.daily_calories}
                onChange={(e) => setGoals({...goals, daily_calories: Number(e.target.value)})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="daily_protein">Daily Protein (g)</Label>
              <Input
                id="daily_protein"
                type="number"
                value={goals.daily_protein}
                onChange={(e) => setGoals({...goals, daily_protein: Number(e.target.value)})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="daily_carbs">Daily Carbs (g)</Label>
              <Input
                id="daily_carbs"
                type="number"
                value={goals.daily_carbs}
                onChange={(e) => setGoals({...goals, daily_carbs: Number(e.target.value)})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="daily_fat">Daily Fat (g)</Label>
              <Input
                id="daily_fat"
                type="number"
                value={goals.daily_fat}
                onChange={(e) => setGoals({...goals, daily_fat: Number(e.target.value)})}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Goals'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showFoodDialog} onOpenChange={setShowFoodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Food Item</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="manual" className="flex items-center gap-1">
                <ListFilter className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                AI Analyzer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual">
              <form onSubmit={handleAddFood} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="food_name">Food Name</Label>
                  <Input
                    id="food_name"
                    value={newFood.food_name}
                    onChange={(e) => setNewFood({...newFood, food_name: e.target.value})}
                    placeholder="e.g., Boiled Rice"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meal_type">Meal Type</Label>
                  <select 
                    id="meal_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newFood.meal_type}
                    onChange={(e) => setNewFood({...newFood, meal_type: e.target.value})}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="portion_size">Portion Size</Label>
                    <Input
                      id="portion_size"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newFood.portion_size}
                      onChange={(e) => setNewFood({...newFood, portion_size: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portion_unit">Unit</Label>
                    <Input
                      id="portion_unit"
                      value={newFood.portion_unit}
                      onChange={(e) => setNewFood({...newFood, portion_unit: e.target.value})}
                      placeholder="e.g., g, cup, piece"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories (kcal)</Label>
                    <Input
                      id="calories"
                      type="number"
                      min="0"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({...newFood, calories: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newFood.protein}
                      onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newFood.carbs}
                      onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      type="number"
                      step="0.1"
                      min="0"
                      value={newFood.fat}
                      onChange={(e) => setNewFood({...newFood, fat: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Food'}
                  </Button>
                </DialogFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="ai" className="h-[400px] overflow-y-auto">
              <div className="p-1">
                <AiNutritionAnalyzer />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Nutrition Goals
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowGoalDialog(true)}
              >
                Edit Goals
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowFoodDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Food
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Calories</span>
                <span className="font-medium">{totals.calories} / {goals.daily_calories} kcal</span>
              </div>
              <Progress value={percentages.calories} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Protein</span>
                <span className="font-medium">{totals.protein} / {goals.daily_protein} g</span>
              </div>
              <Progress value={percentages.protein} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Carbs</span>
                <span className="font-medium">{totals.carbs} / {goals.daily_carbs} g</span>
              </div>
              <Progress value={percentages.carbs} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Fat</span>
                <span className="font-medium">{totals.fat} / {goals.daily_fat} g</span>
              </div>
              <Progress value={percentages.fat} className="h-2" />
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Today's Food Entries</h3>
            
            {foodEntries.length > 0 ? (
              <div className="space-y-2">
                {foodEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex justify-between items-center p-2 rounded-md bg-secondary/30"
                  >
                    <div>
                      <span className="font-medium">{entry.food_name}</span>
                      <div className="text-xs text-muted-foreground">
                        {entry.calories} kcal · P: {entry.protein}g · C: {entry.carbs}g · F: {entry.fat}g
                      </div>
                      <div className="text-xs font-medium capitalize">
                        {entry.meal_type}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeFoodEntry(entry.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No food entries for today. Add your meals to track your nutrition!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NutritionGoals;
