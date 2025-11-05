// Fix: Implement the WeatherIcon component to dynamically display an icon based on the weather condition.
import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import CloudIcon from './icons/CloudIcon';
import RainIcon from './icons/RainIcon';
import SnowIcon from './icons/SnowIcon';
import ThunderstormIcon from './icons/ThunderstormIcon';
import WindIcon from './icons/WindIcon';

interface WeatherIconProps extends React.SVGProps<SVGSVGElement> {
  condition: string;
  isDay?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, isDay = true, ...props }) => {
  const lowerCaseCondition = condition.toLowerCase();

  if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
    return isDay ? <SunIcon {...props} /> : <MoonIcon {...props} />;
  }
  if (lowerCaseCondition.includes('cloud')) {
    return <CloudIcon {...props} />;
  }
  if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
    return <RainIcon {...props} />;
  }
  if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet')) {
    return <SnowIcon {...props} />;
  }
  if (lowerCaseCondition.includes('thunder') || lowerCaseCondition.includes('storm')) {
    return <ThunderstormIcon {...props} />;
  }
  if (lowerCaseCondition.includes('wind')) {
    return <WindIcon {...props} />;
  }

  // Default icon
  return isDay ? <SunIcon {...props} /> : <MoonIcon {...props} />;
};

export default WeatherIcon;
