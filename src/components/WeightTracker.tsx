
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

const WeightTracker: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weightLogs, setWeightLogs] = useState<{weight: number, recorded_at: string}[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we need to show the weight dialog
    const checkLastWeightLog = async () => {
      if (user) {
        try {
          // Get the latest weight log for the user
          const { data: latestLog, error } = await supabase
            .from('weight_logs')
            .select('recorded_at')
            .eq('user_id', user.id)
            .order('recorded_at', { ascending: false })
            .limit(1);

          if (error) throw error;

          // If no logs or the latest log is not from today, show the dialog
          if (!latestLog?.length || !isToday(new Date(latestLog[0].recorded_at))) {
            setShowDialog(true);
          }
          
          fetchWeightLogs();
        } catch (error: any) {
          console.error('Error checking weight logs:', error);
        }
      }
    };

    checkLastWeightLog();
  }, [user]);

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const fetchWeightLogs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('weight_logs')
        .select('weight, recorded_at')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(7);

      if (error) throw error;
      
      setWeightLogs(data || []);
    } catch (error: any) {
      console.error('Error fetching weight logs:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch weight logs',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      toast({
        title: 'Invalid weight',
        description: 'Please enter a valid weight',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to track your weight',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('weight_logs')
        .insert([
          { 
            user_id: user.id, 
            weight: Number(weight) 
          }
        ]);

      if (error) throw error;

      toast({
        title: 'Weight recorded',
        description: 'Your weight has been successfully logged!',
      });

      fetchWeightLogs();
      setShowDialog(false);
    } catch (error: any) {
      console.error('Error logging weight:', error);
      toast({
        title: 'Error',
        description: 'Failed to log weight. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format the date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Log Today's Weight
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Your Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight"
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Weight'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="w-full">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Weight Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Recent logs</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDialog(true)}
              className="text-xs"
            >
              Log Weight
            </Button>
          </div>

          {weightLogs.length > 0 ? (
            <div className="space-y-2">
              {weightLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex justify-between items-center p-2 rounded-md bg-secondary/30"
                >
                  <span className="text-sm font-medium">{formatDate(log.recorded_at)}</span>
                  <span className="font-bold">{log.weight} kg</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No weight logs yet. Start tracking today!
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default WeightTracker;
