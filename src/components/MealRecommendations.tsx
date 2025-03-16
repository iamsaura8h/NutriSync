import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carrot, Coffee, Salad, Utensils, Sun, Moon } from 'lucide-react';

type Goal = 'loss' | 'maintenance' | 'gain';

interface MealRecommendationsProps {
  calories: number;
  goal: Goal;
}

const MealRecommendations: React.FC<MealRecommendationsProps> = ({ calories, goal }) => {
  // Get meal plan based on calorie needs and goal
  const getMealPlan = () => {
    if (goal === 'loss') {
      return {
        title: 'Weight Loss Meal Plan',
        description: 'Lower carb, higher protein diet with focus on whole foods',
        meals: [
          {
            name: 'Breakfast',
            icon: <Coffee className="h-5 w-5 text-primary" />,
            items: [
              '1 bowl Moong Dal Chilla with mint chutney',
              '1 cup green tea or black coffee',
              '1/2 cup low-fat yogurt'
            ],
            delay: 0.1
          },
          {
            name: 'Lunch',
            icon: <Sun className="h-5 w-5 text-primary" />,
            items: [
              '1 bowl mixed vegetable dal',
              '2 multigrain rotis',
              '1 bowl cucumber raita',
              '1 bowl vegetable salad'
            ],
            delay: 0.2
          },
          {
            name: 'Snack',
            icon: <Carrot className="h-5 w-5 text-primary" />,
            items: [
              '1 apple or 1 orange',
              'Handful of roasted chana',
              '1 cup green tea'
            ],
            delay: 0.3
          },
          {
            name: 'Dinner',
            icon: <Moon className="h-5 w-5 text-primary" />,
            items: [
              '1 bowl vegetable curry (no cream)',
              '1 multigrain roti',
              '1 bowl mixed vegetables',
              '1 small bowl dal'
            ],
            delay: 0.4
          }
        ]
      };
    } else if (goal === 'gain') {
      return {
        title: 'Weight Gain Meal Plan',
        description: 'Higher calorie, nutrient-dense foods with adequate protein',
        meals: [
          {
            name: 'Breakfast',
            icon: <Coffee className="h-5 w-5 text-primary" />,
            items: [
              '2 stuffed parathas with ghee',
              '1 bowl paneer bhurji',
              '1 glass full-fat milk with nuts',
              '1 banana'
            ],
            delay: 0.1
          },
          {
            name: 'Lunch',
            icon: <Sun className="h-5 w-5 text-primary" />,
            items: [
              '2 cups rice',
              '1 bowl rajma or chole',
              '2-3 chapatis with ghee',
              '1 bowl vegetable curry',
              '1 glass buttermilk'
            ],
            delay: 0.2
          },
          {
            name: 'Snack',
            icon: <Carrot className="h-5 w-5 text-primary" />,
            items: [
              '1 mango milkshake or banana shake',
              '2 samosas or 1 plate pakoras',
              '1 cup chai with full-fat milk'
            ],
            delay: 0.3
          },
          {
            name: 'Dinner',
            icon: <Moon className="h-5 w-5 text-primary" />,
            items: [
              '2 cups biryani or pulao',
              '1 bowl paneer butter masala',
              '2-3 butter naans',
              '1 bowl mixed vegetable curry',
              '1 bowl sweet (kheer or halwa)'
            ],
            delay: 0.4
          }
        ]
      };
    } else {
      return {
        title: 'Weight Maintenance Meal Plan',
        description: 'Balanced diet with moderate portions',
        meals: [
          {
            name: 'Breakfast',
            icon: <Coffee className="h-5 w-5 text-primary" />,
            items: [
              '2 idlis with sambhar and chutney',
              'OR 1 bowl poha with vegetables',
              '1 cup tea or coffee',
              '1 fruit (apple or orange)'
            ],
            delay: 0.1
          },
          {
            name: 'Lunch',
            icon: <Sun className="h-5 w-5 text-primary" />,
            items: [
              '1.5 cups rice or 3 chapatis',
              '1 bowl dal',
              '1 bowl vegetable curry',
              '1 bowl salad',
              '1 bowl curd'
            ],
            delay: 0.2
          },
          {
            name: 'Snack',
            icon: <Carrot className="h-5 w-5 text-primary" />,
            items: [
              '1 bowl sprouts chaat',
              'OR 1 vegetable sandwich',
              '1 cup chai',
              'Handful of nuts'
            ],
            delay: 0.3
          },
          {
            name: 'Dinner',
            icon: <Moon className="h-5 w-5 text-primary" />,
            items: [
              '2-3 chapatis',
              '1 bowl dal or rajma',
              '1 bowl vegetable curry',
              '1 bowl curd or raita'
            ],
            delay: 0.4
          }
        ]
      };
    }
  };

  const mealPlan = getMealPlan();

  const MealCard: React.FC<{ meal: any }> = ({ meal }) => (
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
            {meal.items.map((item: string, idx: number) => (
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
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="glass-card rounded-xl overflow-hidden shadow-sm mt-8"
    >
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{mealPlan.title}</h2>
            <p className="text-muted-foreground mt-1">{mealPlan.description}</p>
          </div>
          <div className="text-xs px-3 py-1 bg-secondary rounded-full">
            Preview Mode
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Based on your recommended daily caloric intake of{' '}
          <span className="font-medium text-foreground">{Math.round(calories)} kcal</span>,
          here are some suggested Indian meal options:
        </p>

        <div className="space-y-4">
          {mealPlan.meals.map((meal, index) => (
            <MealCard key={index} meal={meal} />
          ))}
        </div>

        <div className="mt-6 bg-secondary/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Notes:</span>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Adjust portion sizes based on your hunger levels and activity.</li>
              <li>Stay hydrated by drinking 8-10 glasses of water daily.</li>
              <li>These are sample recommendations. Consult a nutritionist for a personalized plan.</li>
              <li>Include seasonal fruits and vegetables for better nutrition.</li>
            </ul>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            Get Detailed Meal Plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MealRecommendations;