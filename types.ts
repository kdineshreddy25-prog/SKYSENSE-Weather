export interface CurrentWeather {
  temperature: number;
  condition: string;
  highTemp: number;
  lowTemp: number;
  isDay: boolean;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  visibility: number; // in km
  sunrise: string;
  sunset: string;
  timezone: string;
  aqi: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  isDay: boolean;
}

export interface DailyForecast {
  day: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
}

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}