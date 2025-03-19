
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carrot, Coffee, Salad, Utensils, Sun, Moon, ListFilter, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AiMealPlanner from './AiMealPlanner';

type Goal = 'loss' | 'maintenance' | 'gain';

interface MealRecommendationsProps {
  calories: number;
  goal: Goal;
}

const MealRecommendations: React.FC<MealRecommendationsProps> = ({ calories =  2000, goal = 'maintenance' }) => {
  const [activeTab, setActiveTab] = useState<string>("standard");

  useEffect(() => {
    console.log('MealRecommendations props:', { calories, goal });
  }, [calories, goal]);
  
  const getMealPlan = () => {
    const safeGoal = ['loss', 'maintenance', 'gain'].includes(goal) ? goal : 'maintenance';
    
    if (safeGoal === 'loss') {
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
    } else if (safeGoal === 'gain') {
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
      className="bg-background rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all"
    >
      <div className="flex items-start space-x-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {meal.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-base mb-2">{meal.name}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {meal.items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const safeCalories = calories && !isNaN(calories) && calories > 0 ? calories : 2000;

  return (
    <Card className="w-full h-full overflow-hidden border-2 border-border/5 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-4 bg-gradient-to-r from-background to-secondary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Meal Planner
          </CardTitle>
        </div>
        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mt-3">
            <TabsTrigger value="standard" className="flex items-center gap-1">
              <ListFilter className="h-4 w-4" />
              Standard
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI Powered
            </TabsTrigger>
          </TabsList>
          
          <CardContent className="px-0 pt-6">
            <TabsContent value="standard" className="mt-0 space-y-6">
              <p className="text-muted-foreground mb-6 px-6">
                Based on your recommended daily caloric intake of{' '}
                <span className="font-medium text-foreground">{Math.round(safeCalories)} kcal</span>,
                here are some suggested Indian meal options:
              </p>

              <div className="space-y-4 px-6">
                {mealPlan.meals.map((meal, index) => (
                  <MealCard key={index} meal={meal} />
                ))}
              </div>

              <div className="mt-6 bg-secondary/30 rounded-xl p-4 mx-6">
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
            </TabsContent>
            
            <TabsContent value="ai" className="mt-0">
              <AiMealPlanner />
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default MealRecommendations;
