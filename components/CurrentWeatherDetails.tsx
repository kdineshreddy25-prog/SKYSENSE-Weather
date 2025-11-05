import React from 'react';
import { WeatherData } from '../types';
import Header from './Header';
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherMetricsGrid from './WeatherMetricsGrid';
import { Unit } from '../utils';
import SunTimes from './SunTimes';

interface CurrentWeatherDetailsProps {
  data: WeatherData;
  onBack: () => void;
  units: Unit;
  onUnitToggle: () => void;
  isFavorite: boolean;
  onToggleFavorite: (locationName: string) => void;
}

const CurrentWeatherDetails: React.FC<CurrentWeatherDetailsProps> = ({ data, onBack, units, onUnitToggle, isFavorite, onToggleFavorite }) => {
  return (
    <div className="text-white p-4 sm:p-6 pb-8 flex flex-col items-center">
      <div className="w-full sm:w-4/5 max-w-6xl">
        <Header onBack={onBack} units={units} onUnitToggle={onUnitToggle} />
      </div>
      <div className="mt-6 space-y-6 w-full flex flex-col items-center">
        <div className="w-full max-w-lg">
          <WeatherCard 
            data={data} 
            units={units} 
            isFavorite={isFavorite} 
            onToggleFavorite={() => onToggleFavorite(data.location)} 
          />
        </div>
        <div className="w-full sm:w-4/5 max-w-6xl">
            <SunTimes sunrise={data.current.sunrise} sunset={data.current.sunset} />
        </div>
        <div className="w-full sm:w-4/5 max-w-6xl">
          <HourlyForecast forecasts={data.hourly} units={units} />
        </div>
        <div className="w-full sm:w-4/5 max-w-6xl">
          <DailyForecast forecasts={data.daily} units={units} />
        </div>
        <div className="w-full sm:w-4/5 max-w-6xl">
          <WeatherMetricsGrid metrics={data.current} units={units} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDetails;