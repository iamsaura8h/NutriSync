import express from "express";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });

const corsOptions = {
  origin: ["http://localhost:8080", "https://nutrisync-ai.vercel.app"], // Allow only your frontend
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello from backend");
});

// NutriScan api
app.post("/analyze", upload.single("dishImage"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath).toString("base64");

    // Step 1: Check if the image is food
    const foodCheckResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageData,
                },
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: `Analyze the image and answer only with "yes" or "no". Is this image food?`
              }
            ],
          },
        ],
      }
    );

    const isFood =
      foodCheckResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text
        .toLowerCase()
        .includes("yes");

    if (!isFood) {
      fs.unlinkSync(imagePath);
      return res.json({ error: "This image does not contain food. Please upload a valid dish image." });
    }

    // Step 2: Get nutrition details if it's food
    const nutritionResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageData,
                },
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: `You are a food nutrition expert. Identify the dish in the given image and provide an estimated nutritional breakdown per 100 grams. If the dish is unclear, return "Unknown Food". Format response strictly as JSON:

{
  "dish": "Dish Name",
  "calories_per_100g": "XXX kcal",
  "protein_per_100g": "XX g",
  "carbs_per_100g": "XX g",
  "fat_per_100g": "XX g",
  "sugar_per_100g": "XX g",
  "fiber_per_100g": "XX g",
  "sodium_per_100g": "XX mg",
  "calcium_per_100g": "XX mg",
  "iron_per_100g": "XX mg"
}

Ensure values are estimated ranges based on common nutritional data.`
              },
            ],
          },
        ],
      }
    );

    fs.unlinkSync(imagePath);

    // Extract and clean JSON response
    const geminiResponse =
      nutritionResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const jsonStart = geminiResponse.indexOf("{");
    const jsonEnd = geminiResponse.lastIndexOf("}");
    const cleanJson = geminiResponse.substring(jsonStart, jsonEnd + 1);

    const parsedData = JSON.parse(cleanJson);

    // If dish is "Unknown Food", return an error message
    if (parsedData.dish.toLowerCase().includes("unknown food")) {
      return res.json({ error: "Could not identify the dish. Please upload a clearer food image." });
    }

    res.json(parsedData);
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to analyze image" });
  }
});


// AI Nutrion Finder
app.post("/analyze-nutrition", async (req, res) => {
  try {
    const { dish, portion } = req.body;
    if (!dish || !portion) {
      return res.status(400).json({ error: "Dish name and portion size are required." });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a food nutrition expert. Estimate the nutritional values for "${dish}" for a portion size of "${portion}". Provide the output in JSON format with approximate values (no ranges). Example output:

{
  "dish": "Dish Name",
  "portion": "Portion Size",
  "calories": 400,
  "protein_g": 17,
  "carbs_g": 31,
  "fat_g": 23
}

Only return valid JSON data.`
              }
            ]
          }
        ]
      }
    );

    // Extract and parse the response
    const geminiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const jsonStart = geminiResponse.indexOf("{");
    const jsonEnd = geminiResponse.lastIndexOf("}");
    const cleanJson = geminiResponse.substring(jsonStart, jsonEnd + 1);

    const parsedData = JSON.parse(cleanJson);

    res.json(parsedData);
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to analyze nutrition data." });
  }
});

// AI Meal Planner
app.post("/generate-meal-plan", async (req, res) => {
  try {
    const { ingredients, cuisine, mealType, targetCalories } = req.body;

    if (!ingredients || !cuisine || !mealType || !targetCalories) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const prompt = `
      You are a dietitian. Suggest 3-4 meal options based on the following details:
      - Preferred ingredients: ${ingredients}
      - Cuisine: ${cuisine}
      - Meal Type: ${mealType}
      - Target Calories: ${targetCalories} kcal

      Each meal should include:
      - Dish name
      - Approximate calories
      - Brief description

      Respond in the following JSON format:

      {
        "meals": [
          { "name": "Meal Name", "calories": XXX, "description": "Short description" },
          { "name": "Meal Name", "calories": XXX, "description": "Short description" },
          { "name": "Meal Name", "calories": XXX, "description": "Short description" }
        ]
      }
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }
    );

    // Extract JSON response
    const geminiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonStart = geminiResponse.indexOf("{");
    const jsonEnd = geminiResponse.lastIndexOf("}");
    const cleanJson = geminiResponse.substring(jsonStart, jsonEnd + 1);

    const parsedData = JSON.parse(cleanJson);
    res.json(parsedData);
  } catch (error) {
    console.error("Error from Gemini API:", error.message);
    res.status(500).json({ error: "Failed to generate meal plan." });
  }
});

// server
app.listen(5000, () => console.log("Server running on port 5000"));
