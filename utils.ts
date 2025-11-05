import { CurrentWeather } from "./types";

export type Unit = 'metric' | 'imperial';

export const convertTemperature = (celsius: number, toUnit: Unit): number => {
  if (toUnit === 'imperial') {
    return Math.round((celsius * 9 / 5) + 32);
  }
  return Math.round(celsius);
};

export const convertSpeed = (kph: number, toUnit: Unit): number => {
  if (toUnit === 'imperial') {
    return Math.round(kph * 0.621371);
  }
  return Math.round(kph);
};

export const convertDistance = (km: number, toUnit: Unit): number => {
    if (toUnit === 'imperial') {
      return Math.round(km * 0.621371);
    }
    return Math.round(km);
};


export const getWeatherBackgroundClasses = (currentWeather: CurrentWeather): string => {
  const { condition, isDay } = currentWeather;
  const lowerCaseCondition = condition.toLowerCase();

  if (!isDay) {
    return 'bg-gradient-to-br from-[#0B071B] via-[#2A1B4A] to-black';
  }
  if (lowerCaseCondition.includes('thunder') || lowerCaseCondition.includes('storm')) {
    return 'bg-gradient-to-br from-gray-700 via-gray-900 to-black';
  }
  if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
    return 'bg-gradient-to-br from-sky-600 via-gray-600 to-gray-800';
  }
  if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet')) {
    return 'bg-gradient-to-br from-sky-300 via-gray-400 to-gray-500';
  }
  if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('fog')) {
    return 'bg-gradient-to-br from-sky-500 via-gray-400 to-gray-600';
  }
  if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
    return 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600';
  }
  
  return 'bg-gradient-to-br from-sky-500 to-indigo-600'; // Default day
};

export const getUvIndexInfo = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-500' };
    return { level: 'Extreme', color: 'text-purple-500' };
};

// --- Favorites Management ---
const FAVORITES_KEY = 'gemini_weather_favorites';

export const getFavorites = (): string[] => {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    return [];
  }
};

const saveFavorites = (favorites: string[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage", error);
  }
};

export const addFavorite = (locationName: string): string[] => {
  const currentFavorites = getFavorites();
  if (!currentFavorites.includes(locationName)) {
    const newFavorites = [...currentFavorites, locationName];
    saveFavorites(newFavorites);
    return newFavorites;
  }
  return currentFavorites;
};

export const removeFavorite = (locationName: string): string[] => {
  const currentFavorites = getFavorites();
  const newFavorites = currentFavorites.filter(name => name !== locationName);
  saveFavorites(newFavorites);
  return newFavorites;
};