# NutriScan - Indian Dish Nutrition Analyzer 🍛📸

NutriScan is an AI-powered web application that allows users to upload images of dishes and receive their nutritional values per 100g. It primarily focuses on Indian cuisine but can recognize other dishes as well.ALos it calculates your BMI and also the BMR along with which it also consists of Meal Planner.

## 🚀 Features
- 📷 Upload an image of a dish
- 🔍 AI-based dish recognition using Google Gemini API
- 📊 Detailed nutritional information (calories, macronutrients, vitamins, and minerals)
- 📝 Meal Planner
- 🏋️ Calcualtes BMI and BMR and suggests amount of calories to be consumed on daily basis.
- 🎨 Beautiful and responsive UI
- ⚡ Fast and efficient processing

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

## 🖼️ Usage
1. Upload an image of a dish.
2. The app will analyze and identify the dish.
3. Get detailed nutritional values per 100g.
4. Calculate BMI and BMR
---

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
