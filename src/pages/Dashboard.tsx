
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
import WelcomeMessage from '@/components/WelcomeMessage';
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
  }, [user, healthData, setHealthInputs, calculateAll]);

  if (loading || !user) return null;

  // Let's add a check to ensure we have valid calorieNeeds before passing to MealRecommendations
  const calorieNeeds = healthData?.calorieNeeds && !isNaN(healthData.calorieNeeds) 
    ? healthData.calorieNeeds 
    : 2000; // Fallback to 2000 calories if no valid data

  // Make sure we have a valid goal string
  const goalType = healthData?.goal === Goal.WEIGHT_LOSS ? 'loss' :
                 healthData?.goal === Goal.WEIGHT_GAIN ? 'gain' : 'maintenance';

  console.log("Dashboard rendering with health data:", { 
    calorieNeeds, 
    goalType, 
    rawGoal: healthData?.goal 
  });

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto space-y-6">
        <WelcomeMessage />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* First row */}
          <div className="lg:col-span-4">
            <WeightTracker />
          </div>
          <div className="lg:col-span-8">
            <ProgressTracker />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Second row */}
          <div className="lg:col-span-6">
            <NutritionGoals />
          </div>
          <div className="lg:col-span-6">
            <MealRecommendations 
              calories={calorieNeeds} 
              goal={goalType} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
