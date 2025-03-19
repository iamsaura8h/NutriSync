
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  ActivityLevel, 
  BMICategory, 
  Gender, 
  Goal,
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateCalorieNeeds,
} from '@/utils/calculations';

interface HealthData {
  // Input values
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
  
  // Calculated values
  bmi: number;
  bmiCategory: BMICategory;
  bmr: number;
  tdee: number;
  calorieNeeds: number;
}

interface HealthContextType {
  healthData: HealthData | null;
  setHealthInputs: (data: Omit<HealthData, 'bmi' | 'bmiCategory' | 'bmr' | 'tdee' | 'calorieNeeds'>) => void;
  calculateAll: () => void;
  clearData: () => void;
}

const defaultHealthData: HealthData = {
  weight: 70,
  height: 170,
  age: 30,
  gender: Gender.MALE,
  activityLevel: ActivityLevel.MODERATELY_ACTIVE,
  goal: Goal.MAINTENANCE,
  bmi: 0,
  bmiCategory: BMICategory.NORMAL,
  bmr: 0,
  tdee: 0,
  calorieNeeds: 0,
};

const HealthContext = createContext<HealthContextType>({
  healthData: null,
  setHealthInputs: () => {},
  calculateAll: () => {},
  clearData: () => {},
});

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  const setHealthInputs = (data: Omit<HealthData, 'bmi' | 'bmiCategory' | 'bmr' | 'tdee' | 'calorieNeeds'>) => {
    setHealthData((prevData) => ({
      ...prevData || defaultHealthData,
      ...data,
    }));
  };

  const calculateAll = () => {
    if (!healthData) return;

    const { weight, height, age, gender, activityLevel, goal } = healthData;
    
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const calorieNeeds = calculateCalorieNeeds(tdee, goal);

    // Log values for debugging
    console.log('Calculated values:', { bmi, bmiCategory, bmr, tdee, calorieNeeds, goal });

    setHealthData((prevData) => ({
      ...prevData!,
      bmi,
      bmiCategory,
      bmr,
      tdee,
      calorieNeeds,
    }));
  };

  // Recalculate values whenever health inputs change
  useEffect(() => {
    if (healthData) {
      calculateAll();
    }
  }, [healthData?.weight, healthData?.height, healthData?.age, healthData?.gender, healthData?.activityLevel, healthData?.goal]);

  const clearData = () => {
    setHealthData(null);
  };

  return (
    <HealthContext.Provider value={{ healthData, setHealthInputs, calculateAll, clearData }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
