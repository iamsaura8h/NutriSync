import express from "express";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS

dotenv.config();
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello from backend");
});

app.post("/analyze", upload.single("dishImage"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath).toString("base64");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
                text: `You are a food nutrition expert. Identify the dish in the given image and provide an estimated nutritional breakdown per 100 grams. The dish is most likely Indian, but it may also belong to other cuisines. If the dish is a curry but unclear, identify the primary vegetable or ingredient and name it as "BlaBla ki Sabzi" or "BlaBla Curry."

Return the following details in JSON format:

{
  "dish": "Dish Name",
  "calories_per_100g": "XXX-XXX kcal",
  "protein_per_100g": "XX-XX g",
  "carbs_per_100g": "XX-XX g",
  "fat_per_100g": "XX-XX g",
  "fiber_per_100g": "XX-XX g",
  "sugar_per_100g": "XX-XX g",
  "cholesterol_per_100g": "XX-XX g",
  "sodium_per_100g": "XX-XX g",
  "vitamin_b3_per_100g": "XX-XX g",
  "vitamin_c_per_100g": "XX-XX g",
  "manganese_per_100g": "XX-XX g",
  "folate_per_100g": "XX-XX g",
  "vitamin_b6_per_100g": "XX-XX g",
  "vitamin_b12_per_100g": "XX-XX g",
  "potassium_per_100g": "XX-XX g",
  "phosphorus_per_100g": "XX-XX g",
  "iron_per_100g": "XX-XX g",
  "vitamin_k_per_100g": "XX-XX g",
  "zinc_per_100g": "XX-XX g",
  "selenium_per_100g": "XX-XX g",
  "vitamin_e_per_100g": "XX-XX g",
  "magnesium_per_100g": "XX-XX g",
  "copper_per_100g": "XX-XX g",
  "vitamin_b1_per_100g": "XX-XX g",
  "vitamin_b2_per_100g": "XX-XX g",
  "vitamin_b5_per_100g": "XX-XX g",
  "calcium_per_100g": "XX-XX g",
  "vitamin_a_per_100g": "XX-XX g"
}

Ensure all values are estimated ranges based on common nutritional data. Keep responses concise and accurate.
`,
              },
            ],
          },
        ],
      }
    );

    fs.unlinkSync(imagePath); // Delete uploaded image after processing

    // Extract and clean up JSON response
    const geminiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonStart = geminiResponse.indexOf("{");
    const jsonEnd = geminiResponse.lastIndexOf("}");
    const cleanJson = geminiResponse.substring(jsonStart, jsonEnd + 1);

    const parsedData = JSON.parse(cleanJson); // Parse extracted JSON
    res.json(parsedData); // Send clean JSON response
  } catch (error) {
    console.error(
      "Error from Gemini API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
