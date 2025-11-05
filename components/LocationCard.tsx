import React from 'react';
import { WeatherData } from '../types';
import WeatherIcon from './WeatherIcon';
import { getWeatherBackgroundClasses, Unit, convertTemperature } from '../utils';
import StarIcon from './icons/StarIcon';
import StarOutlineIcon from './icons/StarOutlineIcon';

interface LocationCardProps {
  data: WeatherData;
  onClick: () => void;
  units: Unit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ data, onClick, units, isFavorite, onToggleFavorite }) => {
  const { location, current } = data;
  const { temperature, condition, highTemp, lowTemp, isDay } = current;

  const backgroundClasses = getWeatherBackgroundClasses(current);

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      className={`relative p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300 ${backgroundClasses}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
    >
      <button 
        onClick={handleFavClick} 
        className="absolute top-3 right-3 z-20 p-1 text-yellow-300 hover:text-yellow-200 transition-colors"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        style={{filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))'}}
      >
        {isFavorite ? <StarIcon className="w-6 h-6" /> : <StarOutlineIcon className="w-6 h-6" />}
      </button>
      <div className="relative z-10 flex flex-col text-left text-white">
        <p className="text-xl font-bold" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{location.split(',')[0]}</p>
        <p className="text-sm" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{condition}</p>
        <p className="text-sm mt-1" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>High: {convertTemperature(highTemp, units)}° Low: {convertTemperature(lowTemp, units)}°</p>
      </div>
      <div className="relative z-10 flex items-center space-x-4 text-white">
        <p className="text-5xl font-thin" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>{convertTemperature(temperature, units)}°</p>
        <WeatherIcon 
            condition={condition} 
            isDay={isDay} 
            className="w-12 h-12" 
            style={{filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))'}}
        />
      </div>
    </div>
  );
};

export default LocationCard;
