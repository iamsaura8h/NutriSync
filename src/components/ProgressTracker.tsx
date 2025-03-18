import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartLine, Calendar, Trophy } from 'lucide-react';

interface WeightLog {
  weight: number;
  recorded_at: string;
}

const ProgressTracker: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightLog[]>([]);
  const [streak, setStreak] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWeightHistory();
      calculateStreak();
    }
  }, [user]);

  const fetchWeightHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('weight_logs')
        .select('weight, recorded_at')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: true });

      if (error) throw error;
      
      setWeightData(data || []);
    } catch (error: any) {
      console.error('Error fetching weight history:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch weight history',
        variant: 'destructive',
      });
    }
  };

  const calculateStreak = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('weight_logs')
        .select('recorded_at')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });

      if (error) throw error;
      
      if (!data || data.length === 0) {
        setStreak(0);
        return;
      }

      // Calculate streak based on consecutive days
      let currentStreak = 1; // Start with 1 for today
      let previousDate = new Date(data[0].recorded_at);
      
      for (let i = 1; i < data.length; i++) {
        const currentDate = new Date(data[i].recorded_at);
        
        // Check if dates are consecutive (1 day apart)
        const diffTime = Math.abs(previousDate.getTime() - currentDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
          previousDate = currentDate;
        } else {
          break; // Streak is broken
        }
      }
      
      setStreak(currentStreak);
    } catch (error: any) {
      console.error('Error calculating streak:', error);
    }
  };

  // Format the data for the chart
  const chartData = weightData.map(log => ({
    date: new Date(log.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: log.weight
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Current Weight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-secondary/20 p-4 rounded-lg"
          >
            <div className="text-sm text-muted-foreground">Current Weight</div>
            <div className="text-2xl font-bold mt-1">
              {weightData.length > 0 ? 
                `${weightData[weightData.length - 1].weight} kg` : 
                'No data'}
            </div>
          </motion.div>
          
          {/* Weight Change */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-secondary/20 p-4 rounded-lg"
          >
            <div className="text-sm text-muted-foreground">Weight Change</div>
            <div className="text-2xl font-bold mt-1">
              {weightData.length > 1 ? 
                `${(weightData[weightData.length - 1].weight - weightData[0].weight).toFixed(1)} kg` : 
                'No data'}
            </div>
          </motion.div>
          
          {/* Tracking Streak */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-secondary/20 p-4 rounded-lg flex items-center space-x-3"
          >
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Tracking Streak</div>
              <div className="text-2xl font-bold mt-1">{streak} days</div>
            </div>
          </motion.div>
        </div>
        
        {/* Weight Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-60 mt-6"
        >
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    border: '1px solid var(--border)',
                    borderRadius: '6px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--primary)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Log your weight regularly to see progress over time</p>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
