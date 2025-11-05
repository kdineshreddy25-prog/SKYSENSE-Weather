import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData } from "../types";

// Fix: Initialize GoogleGenAI with a named apiKey parameter as required by the SDK.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});


const responseSchema = {
  type: Type.OBJECT,
  properties: {
    location: { type: Type.STRING },
    current: {
      type: Type.OBJECT,
      properties: {
        temperature: { type: Type.NUMBER },
        condition: { type: Type.STRING },
        highTemp: { type: Type.NUMBER },
        lowTemp: { type: Type.NUMBER },
        isDay: { type: Type.BOOLEAN },
        windSpeed: { type: Type.NUMBER },
        humidity: { type: Type.NUMBER },
        uvIndex: { type: Type.NUMBER },
        visibility: { type: Type.NUMBER },
        sunrise: { type: Type.STRING },
        sunset: { type: Type.STRING },
        timezone: { type: Type.STRING },
        aqi: { type: Type.NUMBER },
      },
      required: ["temperature", "condition", "highTemp", "lowTemp", "isDay", "windSpeed", "humidity", "uvIndex", "visibility", "sunrise", "sunset", "timezone", "aqi"],
    },
    hourly: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING },
          temperature: { type: Type.NUMBER },
          condition: { type: Type.STRING },
          isDay: { type: Type.BOOLEAN },
        },
        required: ["time", "temperature", "condition", "isDay"],
      },
    },
    daily: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          highTemp: { type: Type.NUMBER },
          lowTemp: { type: Type.NUMBER },
          condition: { type: Type.STRING },
        },
        required: ["day", "highTemp", "lowTemp", "condition"],
      },
    },
  },
  required: ["location", "current", "hourly", "daily"],
};


export const getWeatherData = async (city: string): Promise<WeatherData> => {
  const prompt = `Get the current weather, 12-hour hourly forecast, 7-day daily forecast, and current Air Quality Index (AQI) for ${city}. Use Celsius for temperature. The current day in the daily forecast should be "Today". The hourly forecast should start from the current hour. isDay should be true if it's daytime at the location, false otherwise. Provide the IANA timezone name for the location (e.g., 'America/New_York').`;

  try {
    // Fix: Use the correct 'gemini-2.5-flash' model and `ai.models.generateContent` method.
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    // Fix: Access the response text directly from the result object as per guidelines.
    const text = result.text;
    const weatherData = JSON.parse(text);
    return weatherData as WeatherData;

  } catch (error) {
    console.error("Error fetching weather data from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching weather data.");
  }
};

export const getCitySuggestions = async (query: string): Promise<string[]> => {
  if (!query) return [];
  const prompt = `Suggest up to 5 popular and well-known city names for a weather app that match "${query}". Prioritize major cities and include the country for clarity. Return a JSON array of strings, for example: ["San Francisco, USA", "Santiago, Chile"].`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        // Use a lower temperature for more predictable suggestions
        temperature: 0.2,
      },
    });
    const text = result.text;
    const suggestions = JSON.parse(text);
    return suggestions as string[];
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return []; // Return empty array on error
  }
};