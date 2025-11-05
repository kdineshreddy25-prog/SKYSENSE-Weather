
import React from 'react';
import { DailyForecast as DailyForecastType } from '../types';
import WeatherIcon from './WeatherIcon';
import TemperatureRangeBar from './TemperatureRangeBar';
import { Unit, convertTemperature } from '../utils';

interface DailyForecastProps {
  forecasts: DailyForecastType[];
  units: Unit;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecasts, units }) => {
  if (!forecasts || forecasts.length === 0) return null;

  const allTemps = forecasts.flatMap(f => [f.lowTemp, f.highTemp]);
  const overallMinC = Math.min(...allTemps);
  const overallMaxC = Math.max(...allTemps);

  return (
    <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl">
      <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3 border-b border-white/20 pb-2">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecasts.map((forecast, index) => (
          <div key={index} className="grid grid-cols-3 items-center gap-2">
            <p className="font-medium truncate">{forecast.day}</p>
            <WeatherIcon condition={forecast.condition} isDay={true} className="w-7 h-7 mx-auto" />
            <div className="flex items-center justify-end">
              <TemperatureRangeBar 
                minTemp={convertTemperature(forecast.lowTemp, units)}
                maxTemp={convertTemperature(forecast.highTemp, units)}
                overallMin={convertTemperature(overallMinC, units)}
                overallMax={convertTemperature(overallMaxC, units)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
