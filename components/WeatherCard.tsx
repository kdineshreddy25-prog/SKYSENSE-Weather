import React, { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { Unit, convertTemperature } from '../utils';
import StarIcon from './icons/StarIcon';
import StarOutlineIcon from './icons/StarOutlineIcon';

interface WeatherCardProps {
  data: WeatherData;
  units: Unit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, units, isFavorite, onToggleFavorite }) => {
  const { location, current } = data;
  const { timezone } = current;
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (!timezone) return;

    const updateClock = () => {
       try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        setCurrentTime(new Date().toLocaleTimeString('en-US', options));
      } catch (e) {
        console.warn(`Invalid timezone provided: ${timezone}. Falling back to local time.`);
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}));
      }
    };
    
    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, [timezone]);

  return (
    <div className="w-full max-w-lg mx-auto text-center flex flex-col items-center">
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-3xl sm:text-4xl font-medium" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>{location}</h2>
        <button 
          onClick={onToggleFavorite} 
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <StarIcon className="w-7 h-7" /> : <StarOutlineIcon className="w-7 h-7" />}
        </button>
      </div>
      {currentTime && <p className="text-lg mt-1 tracking-wider">{currentTime}</p>}
      <p className="text-7xl sm:text-8xl font-thin my-1 tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>{convertTemperature(current.temperature, units)}°</p>
      <p className="text-xl sm:text-2xl capitalize">{current.condition}</p>
      <p className="text-lg sm:text-xl mt-1">High: {convertTemperature(current.highTemp, units)}° Low: {convertTemperature(current.lowTemp, units)}°</p>
    </div>
  );
};

export default WeatherCard;
