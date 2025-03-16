
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ResultCard from '@/components/ResultCard';
import MealRecommendations from '@/components/MealRecommendations';
import { Button } from '@/components/ui/button';
import { useHealth } from '@/contexts/HealthContext';
import { RotateCcw, Save } from 'lucide-react';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { healthData } = useHealth();

  useEffect(() => {
    if (!healthData) {
      navigate('/calculator');
    }
  }, [healthData, navigate]);

  if (!healthData) {
    return null;
  }

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
              onClick={() => alert('Save feature will be implemented with Supabase integration')}
            >
              <Save className="h-4 w-4" />
              Save Results
            </Button>
          </div>
        </div>

        <ResultCard />
        <MealRecommendations />
      </div>
    </Layout>
  );
};

export default Results;
