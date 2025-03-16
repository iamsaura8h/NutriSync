
// BMI Categories
export enum BMICategory {
  UNDERWEIGHT = 'Underweight',
  NORMAL = 'Normal weight',
  OVERWEIGHT = 'Overweight',
  OBESE = 'Obese',
}

// Activity levels and their multiplication factors
export enum ActivityLevel {
  SEDENTARY = 'Sedentary',
  LIGHTLY_ACTIVE = 'Lightly Active',
  MODERATELY_ACTIVE = 'Moderately Active',
  VERY_ACTIVE = 'Very Active',
}

export const ACTIVITY_MULTIPLIERS = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
  [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
};

// Goal types
export enum Goal {
  WEIGHT_LOSS = 'Weight Loss',
  MAINTENANCE = 'Maintenance',
  WEIGHT_GAIN = 'Weight Gain',
}

// Gender enum
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

// Calculate BMI
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

// Get BMI Category
export const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return BMICategory.UNDERWEIGHT;
  if (bmi < 25) return BMICategory.NORMAL;
  if (bmi < 30) return BMICategory.OVERWEIGHT;
  return BMICategory.OBESE;
};

// Calculate BMR using Mifflin-St Jeor Equation
export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: Gender
): number => {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return gender === Gender.MALE ? base + 5 : base - 161;
};

// Calculate TDEE (Total Daily Energy Expenditure)
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
};

// Calculate daily calorie needs based on goal
export const calculateCalorieNeeds = (tdee: number, goal: Goal): number => {
  switch (goal) {
    case Goal.WEIGHT_LOSS:
      return tdee - 500;
    case Goal.WEIGHT_GAIN:
      return tdee + 500;
    case Goal.MAINTENANCE:
    default:
      return tdee;
  }
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(Math.round(num));
};
