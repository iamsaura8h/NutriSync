
import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/utils/calculations';
import { useHealth } from '@/contexts/HealthContext';
import { ArrowRight } from 'lucide-react';

const ResultCard: React.FC = () => {
  const { healthData } = useHealth();

  if (!healthData) {
    return null;
  }

  const { bmi, bmiCategory, bmr, tdee, calorieNeeds, goal } = healthData;

  // Function to get BMI category styling
  const getBMICategoryStyle = () => {
    switch (bmiCategory) {
      case 'Underweight':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Normal weight':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'Overweight':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Obese':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  // Function to get goal styling
  const getGoalStyle = () => {
    switch (goal) {
      case 'Weight Loss':
        return 'text-blue-500 border-blue-200 dark:border-blue-900/30';
      case 'Maintenance':
        return 'text-green-500 border-green-200 dark:border-green-900/30';
      case 'Weight Gain':
        return 'text-amber-500 border-amber-200 dark:border-amber-900/30';
      default:
        return 'text-gray-500 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl overflow-hidden shadow-sm"
    >
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Your Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BMI Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-background rounded-xl p-5 shadow-sm"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-1">Body Mass Index</h3>
              <p className="text-muted-foreground text-sm">
                Measures body fat based on height and weight
              </p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-bold">{bmi.toFixed(1)}</span>
                <span className="text-lg text-muted-foreground ml-1">kg/m²</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getBMICategoryStyle()}`}>
                {bmiCategory}
              </div>
            </div>
          </motion.div>

          {/* BMR Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-background rounded-xl p-5 shadow-sm"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-1">Basal Metabolic Rate</h3>
              <p className="text-muted-foreground text-sm">
                Calories your body needs at complete rest
              </p>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold">{formatNumber(bmr)}</span>
              <span className="text-lg text-muted-foreground ml-1">kcal/day</span>
            </div>
          </motion.div>
        </div>

        {/* TDEE & Calorie Needs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-6 bg-background rounded-xl p-5 shadow-sm"
        >
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-1">Daily Energy Expenditure</h3>
            <p className="text-muted-foreground text-sm">
              Total calories burned daily based on your activity level
            </p>
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{formatNumber(tdee)}</span>
            <span className="text-lg text-muted-foreground ml-1">kcal/day</span>
          </div>
        </motion.div>

        {/* Calorie Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={`mt-6 border-2 rounded-xl p-5 ${getGoalStyle()}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Recommended Calories</h3>
              <p className="text-muted-foreground text-sm">
                For your goal: <span className="font-medium">{goal}</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex items-end">
            <span className="text-4xl font-bold">{formatNumber(calorieNeeds)}</span>
            <span className="text-lg text-muted-foreground ml-1">kcal/day</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
