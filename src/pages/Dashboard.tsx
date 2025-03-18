
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import WeightTracker from '@/components/WeightTracker';
import NutritionGoals from '@/components/NutritionGoals';
import ProgressTracker from '@/components/ProgressTracker';
import MealRecommendations from '@/components/MealRecommendations';
import { useHealth } from '@/contexts/HealthContext';
import { Gender, ActivityLevel, Goal } from '@/utils/calculations';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { healthData, setHealthInputs, calculateAll } = useHealth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to access the dashboard',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Set default health data if not available
    if (user && !healthData) {
      setHealthInputs({
        weight: 70,
        height: 170,
        age: 30,
        gender: Gender.MALE,
        activityLevel: ActivityLevel.MODERATELY_ACTIVE,
        goal: Goal.MAINTENANCE,
      });
      calculateAll();
    }
  }, [user, healthData]);

  if (loading || !user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Track your progress, nutrition goals, and get personalized recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <WeightTracker />
          </div>
          <div className="md:col-span-2">
            <ProgressTracker />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <NutritionGoals />
          </div>
          {healthData && (
            <div>
              <MealRecommendations 
                calories={healthData.calorieNeeds} 
                goal={healthData.goal === Goal.WEIGHT_LOSS ? 'loss' : 
                      healthData.goal === Goal.WEIGHT_GAIN ? 'gain' : 
                      'maintenance'} 
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
