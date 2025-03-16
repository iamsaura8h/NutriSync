
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useHealth } from '@/contexts/HealthContext';
import { Utensils, Coffee, Sun, Moon } from 'lucide-react';

// Sample meal recommendations by calorie range
// This will be replaced with API data in the future
const getMealSuggestions = (calories: number) => {
  if (calories < 1600) {
    return {
      breakfast: 'Vegetable omelette (2 eggs) with a small whole wheat toast and herbal tea',
      lunch: 'Dal soup with a small bowl of rice and green vegetable salad',
      dinner: 'Grilled fish (100g) with steamed vegetables and a small serving of brown rice',
      snacks: 'Apple slices with a teaspoon of peanut butter, Green tea',
    };
  } else if (calories < 2200) {
    return {
      breakfast: 'Oatmeal with banana, almonds, and a teaspoon of honey, Glass of milk',
      lunch: 'Chicken curry (150g) with 1 cup rice and vegetable salad',
      dinner: 'Paneer bhurji (150g) with 2 chapatis and mixed vegetables',
      snacks: 'Greek yogurt with berries, Handful of mixed nuts',
    };
  } else {
    return {
      breakfast: 'Masala dosa with sambar, side of fruit, and a glass of banana smoothie',
      lunch: 'Chicken biryani (1 cup) with raita and vegetable curry',
      dinner: 'Paneer butter masala with 3 chapatis and vegetable pulao',
      snacks: 'Protein shake with banana and peanut butter, Dates with milk',
    };
  }
};

const MealCard: React.FC<{ title: string; description: string; icon: React.ReactNode; delay: number }> = ({
  title,
  description,
  icon,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="bg-background rounded-xl p-5 shadow-sm"
  >
    <div className="flex items-start space-x-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-base mb-2">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

const MealRecommendations: React.FC = () => {
  const { healthData } = useHealth();

  if (!healthData) {
    return null;
  }

  const { calorieNeeds } = healthData;
  const meals = getMealSuggestions(calorieNeeds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="glass-card rounded-xl overflow-hidden shadow-sm mt-8"
    >
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Meal Recommendations</h2>
          <div className="text-xs px-3 py-1 bg-secondary rounded-full">
            Preview Mode
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Based on your recommended daily caloric intake of{' '}
          <span className="font-medium text-foreground">{Math.round(calorieNeeds)} kcal</span>,
          here are some suggested Indian meal options:
        </p>

        <div className="space-y-4">
          <MealCard
            title="Breakfast"
            description={meals.breakfast}
            icon={<Coffee className="h-5 w-5 text-primary" />}
            delay={0.1}
          />
          <MealCard
            title="Lunch"
            description={meals.lunch}
            icon={<Sun className="h-5 w-5 text-primary" />}
            delay={0.2}
          />
          <MealCard
            title="Dinner"
            description={meals.dinner}
            icon={<Moon className="h-5 w-5 text-primary" />}
            delay={0.3}
          />
          <MealCard
            title="Snacks"
            description={meals.snacks}
            icon={<Utensils className="h-5 w-5 text-primary" />}
            delay={0.4}
          />
        </div>

        <div className="mt-6 bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Note:</span> These are general recommendations.
            For personalized meal plans with detailed nutrition information, please create an account or login.
            The integrated AI will provide more tailored suggestions based on your preferences and dietary restrictions.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" disabled>
            Get Detailed Meal Plan (Coming Soon)
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MealRecommendations;
