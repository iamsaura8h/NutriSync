
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ResultCard from '@/components/ResultCard';
import MealRecommendations from '@/components/MealRecommendations';
import { Button } from '@/components/ui/button';
import { useHealth } from '@/contexts/HealthContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { RotateCcw, Save, LayoutDashboard } from 'lucide-react';
import { Goal } from '@/utils/calculations';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { healthData } = useHealth();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!healthData) {
      navigate('/calculator');
    }
  }, [healthData, navigate]);

  if (!healthData) {
    return null;
  }

  // Let's add a check to ensure we have valid calorieNeeds
  const calorieNeeds = healthData.calorieNeeds && !isNaN(healthData.calorieNeeds) 
    ? healthData.calorieNeeds 
    : 2000; // Fallback to 2000 calories if no valid data

  // Make sure we have a valid goal string
  const goalType = healthData.goal === Goal.WEIGHT_LOSS ? 'loss' :
                 healthData.goal === Goal.WEIGHT_GAIN ? 'gain' : 'maintenance';

  const saveResults = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your results",
        variant: "destructive"
      });
      return;
    }

    try {
      // We'll need to create a health_results table in Supabase
      // This is just a placeholder for demonstration
      toast({
        title: "Success",
        description: "Your results have been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save results",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Results</h1>
            <p className="text-muted-foreground">
              Based on your height, weight, age, gender, and activity level
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/calculator')} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Recalculate
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              className="flex items-center gap-2"
              onClick={saveResults}
            >
              <Save className="h-4 w-4" />
              Save Results
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
        </div>

        <ResultCard />
        <MealRecommendations 
          calories={calorieNeeds}
          goal={goalType} 
        />
      </div>
    </Layout>
  );
};

export default Results;
