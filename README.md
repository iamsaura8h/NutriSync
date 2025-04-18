# NutriScan - Indian Dish Nutrition Analyzer 🍛📸

NutriSync is an advanced, AI-powered web application designed to revolutionize your health and nutrition journey. By leveraging cutting-edge technology, NutriSync provides personalized insights, tracking, and recommendations tailored to your unique body metrics and health goals.

## 🚀 Features
- 📷 Upload an image of a dish
- 🔍 AI-based dish recognition using Google Gemini API
- 📊 Detailed nutritional information (calories, macronutrients, vitamins, and minerals)
- 📝 Meal Planner
- 🏋️ Calcualtes BMI and BMR and suggests amount of calories to be consumed on daily basis.
- 🎨 Beautiful and responsive UI
- ⚡ Fast and efficient processing

## 🚀 Key Features/Components

### 1. 📊 Body Metrics Analysis
- **BMI Calculator**: Instantly calculate and interpret your Body Mass Index
- **BMR Calculation**: Determine your Basal Metabolic Rate with precision
- **Personalized Calorie Recommendations**: Get daily caloric needs based on your activity level and goals

### 2. 🍽️ Advanced Nutrition Tools
- **AI NutriScan**: Upload food images for instant nutritional analysis
Input: Image of Butter Chicken 
Output: { "dish": "Butter Chicken", "calories_per_100g": "247 kcal", "protein_per_100g": "15.3 g", "carbs_per_100g": "9.8 g", "fat_per_100g": "17.2 g" }
  
- **Intelligent Meal Planner**: Generate personalized meal recommendations.
Input: - Preferred ingredients: "Paneer, Rice, Vegetables" - Cuisine: "North Indian" - Meal Type: "Lunch" - Target Calories: "600"
Output: - Meal Plan: 1. "Paneer Tikka Masala (300 cal)" 2. "Jeera Rice (200 cal)" 3. "Mixed Vegetable Curry (100 cal)" 4. "Raita (50 cal)"

### 3. 🏋️ Progress Tracking
- **Weight Tracking**: Log and visualize your weight changes
Input: Daily weight entries - "2024-04-15: 75.5 kg" - "2024-04-16: 75.2 kg" - "2024-04-17: 75.0 kg"

Output: Interactive graph showing weight trend 📉 Three-day trend: -0.5kg (Progress towards goal)
- **Goal-Oriented Insights**: Tailored recommendations for weight loss, gain, or maintenance

 **Nutrition Progress Dashboard**: Track macronutrients and calorie consumption
Input: Daily goal settings - Calories: 2000 kcal - Protein: 120g - Carbs: 200g - Fat: 65g

Output: Progress bars and percentages Calories: 1500/2000 (75%) ▓▓▓▓▓▓▓▓░░ Protein: 90/120g (75%) ▓▓▓▓▓▓▓▓░░ Carbs: 150/200g (75%) ▓▓▓▓▓▓▓▓░░ Fat: 45/65g (69%) ▓▓▓▓▓▓▓░░░

### 4. 📝 Daily Diet Logger
- **Manual Entry**:
Input: - Food: "Masala Dosa" - Portion: "1 serving" - Meal Type: "Breakfast" - Nutritional Values: * Calories: 250 * Protein: 8g * Carbs: 48g * Fat: 6g
Output: Added to breakfast log with timestamp 🕐 8:30 AM - Masala Dosa 📊 Progress updated on dashboard


- **AI-Powered Analysis**:
Input: "2 pieces of Tandoori Roti with Dal Makhani"
Output: AI Analysis Dish: Tandoori Roti with Dal Makhani Portion: 2 rotis + 1 cup dal Total Calories: 450 kcal Protein: 15g Carbs: 62g Fat: 18g ✅ Added to lunch log automatically

### 5. 🔒 Secure User Experience
- **User Authentication**: Secure login and registration
- **Private Health Dashboard**: Your personal health metrics, privately managed
- **Data Protection**: Robust security measures to protect your information

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** Supabase
- **AI API:** Google Gemini AI



## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/health-buddy.git
cd health-buddy
```

### 2️⃣ Setup Backend
```sh
cd backend
npm install
```
#### Configure Environment Variables
Create a `.env` file in the `backend/` folder and add:
```
PORT=5000
GEMINI_API_KEY=your-google-gemini-api-key
```
#### Start Backend Server
```sh
npm start
```

### 3️⃣ Setup Frontend
```sh
cd ..
npm install
```
#### Start Frontend
```sh
npm run dev
```

### 4️⃣ Start Both Servers Simultaneously
Instead of running frontend and backend in separate terminals, use:
**Run backend code in terminal and frontend in the other (total 2 terminals simultaneosly working)

---

## 🌈 Use Cases

- Weight Management
- Nutritional Planning
- Health Tracking
- Personalized Diet Optimization
- Fitness Goal Setting

## 🎯 Target Audience

- Health-conscious individuals
- Fitness enthusiasts
- People looking to improve their diet
- Individuals tracking weight and nutrition
- Anyone interested in personalized health insights

## 🛠️ Future Improvements
- ✅ Authentication for user profiles
- ✅ History of analyzed dishes
- ✅ Multi-language support
- ✅ More accurate dish recognition

---

## 🤝 Contributing
Want to contribute? Feel free to fork and submit a pull request! 🚀

---

## 📜 License
This project is open-source under the **MIT License**.

# NutriSync 🍎💪 - Your Comprehensive Nutrition & Health Companion

## 🌟 Overview

NutriSync is an advanced, AI-powered web application designed to revolutionize your health and nutrition journey. By leveraging cutting-edge technology, NutriSync provides personalized insights, tracking, and recommendations tailored to your unique body metrics and health goals.



## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn UI
- **Backend:** Node.js, Express
- **Database:** Supabase
- **AI Integration:** Google Gemini API

## 🔧 Key Technologies

- TypeScript for type-safe development
- Tanstack React Query for efficient data fetching
- Framer Motion for smooth animations
- Recharts for interactive data visualization

## 🌈 Use Cases

- Weight Management
- Nutritional Planning
- Health Tracking
- Personalized Diet Optimization
- Fitness Goal Setting

## 🎯 Target Audience

- Health-conscious individuals
- Fitness enthusiasts
- People looking to improve their diet
- Individuals tracking weight and nutrition
- Anyone interested in personalized health insights

## 🔜 Upcoming Features

- Multi-language support
- Integration with fitness tracking devices
- More advanced AI nutritional recommendations
- Social sharing and community features
- Expanded food recognition database

## 🤝 Contributing

Interested in contributing? We welcome pull requests! Please check our contribution guidelines.

## 📜 License

MIT License - Open-source and free to use

## 💡 Disclaimer

NutriSync provides general health and nutrition guidance. Always consult healthcare professionals for personalized medical advice.

