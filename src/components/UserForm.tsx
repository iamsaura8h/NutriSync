
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { ActivityLevel, Gender, Goal } from '@/utils/calculations';
import { useHealth } from '@/contexts/HealthContext';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { setHealthInputs, calculateAll } = useHealth();
  
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.MODERATELY_ACTIVE);
  const [goal, setGoal] = useState<Goal>(Goal.MAINTENANCE);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0 || Number(weight) > 500) {
      newErrors.weight = 'Please enter a valid weight (1-500 kg)';
    }
    
    if (!height || isNaN(Number(height)) || Number(height) <= 0 || Number(height) > 300) {
      newErrors.height = 'Please enter a valid height (1-300 cm)';
    }
    
    if (!age || isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120 years)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setHealthInputs({
      weight: Number(weight),
      height: Number(height),
      age: Number(age),
      gender,
      activityLevel,
      goal,
    });
    
    calculateAll();
    navigate('/results');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl p-6 md:p-8 shadow-sm max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className={errors.weight ? 'border-destructive' : ''}
            />
            {errors.weight && (
              <p className="text-destructive text-sm">{errors.weight}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
              className={errors.height ? 'border-destructive' : ''}
            />
            {errors.height && (
              <p className="text-destructive text-sm">{errors.height}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className={errors.age ? 'border-destructive' : ''}
          />
          {errors.age && (
            <p className="text-destructive text-sm">{errors.age}</p>
          )}
        </div>
        
        <div className="space-y-3">
          <Label>Gender</Label>
          <RadioGroup 
            value={gender} 
            onValueChange={(value) => setGender(value as Gender)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={Gender.MALE} id="male" />
              <Label htmlFor="male" className="cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={Gender.FEMALE} id="female" />
              <Label htmlFor="female" className="cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="activity-level">Activity Level</Label>
          <Select
            value={activityLevel}
            onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
          >
            <SelectTrigger id="activity-level">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ActivityLevel.SEDENTARY}>
                Sedentary (little or no exercise)
              </SelectItem>
              <SelectItem value={ActivityLevel.LIGHTLY_ACTIVE}>
                Lightly Active (light exercise 1-3 days/week)
              </SelectItem>
              <SelectItem value={ActivityLevel.MODERATELY_ACTIVE}>
                Moderately Active (moderate exercise 3-5 days/week)
              </SelectItem>
              <SelectItem value={ActivityLevel.VERY_ACTIVE}>
                Very Active (hard exercise 6-7 days/week)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="goal">Your Goal</Label>
          <Select 
            value={goal}
            onValueChange={(value) => setGoal(value as Goal)}
          >
            <SelectTrigger id="goal">
              <SelectValue placeholder="Select your goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Goal.WEIGHT_LOSS}>Weight Loss</SelectItem>
              <SelectItem value={Goal.MAINTENANCE}>Maintenance</SelectItem>
              <SelectItem value={Goal.WEIGHT_GAIN}>Weight Gain</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full">
          Calculate Results
        </Button>
      </form>
    </motion.div>
  );
};

export default UserForm;
