import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

//Import functions from where the data is being fetched
import { getWeatherData } from "./weatherDataApi.js";
import { getUvIndex } from "./uvDataApi.js";

const app = express();

//Middleware to allow cross-origin requests from the frontend
app.use(cors());

app.get("/api/weather/:place", async (req, res) => {
  try {
    const place = req.params.place;

    const weatherData = await getWeatherData(place);
    const uvData = await getUvIndex(place);

    //Combine the data from the two APIs into one object and send it as a response
    const weatherDetails = {
      ...weatherData,
      ...uvData,
    };

    res.json(weatherDetails);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});
