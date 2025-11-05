
// Fix: Implement the HourlyForecast component.
import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types';
import WeatherIcon from './WeatherIcon';
import { Unit, convertTemperature } from '../utils';

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
  units: Unit;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecasts, units }) => {
  return (
    <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl">
      <h3 className="text-sm text-white/70 uppercase tracking-wider mb-4 border-b border-white/20 pb-2">Hourly Forecast</h3>
      <div className="flex overflow-x-auto -mx-4 px-4 pb-2">
        {forecasts.slice(0, 12).map((forecast, index) => (
          <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0 w-20 md:w-24 text-center">
            <p className="font-medium text-sm md:text-base">{index === 0 ? 'Now' : forecast.time}</p>
            <WeatherIcon condition={forecast.condition} isDay={forecast.isDay} className="w-8 h-8 md:w-10 md:h-10 my-1" />
            <p className="font-bold text-xl md:text-2xl">{convertTemperature(forecast.temperature, units)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;