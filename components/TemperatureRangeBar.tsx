import React from 'react';

interface TemperatureRangeBarProps {
  minTemp: number;
  maxTemp: number;
  overallMin: number;
  overallMax: number;
}

const TemperatureRangeBar: React.FC<TemperatureRangeBarProps> = ({ 
  minTemp, 
  maxTemp, 
  overallMin, 
  overallMax 
}) => {
  const totalRange = overallMax - overallMin;
  if (totalRange <= 0) {
    // Avoid division by zero and handle single-point range
    return (
      <div className="flex items-center w-full">
        <span className="text-sm font-medium w-8 text-left">{minTemp}°</span>
        <div className="w-full h-1.5 mx-2 rounded-full bg-gray-700/50" />
        <span className="text-sm font-medium w-8 text-right">{maxTemp}°</span>
      </div>
    );
  }

  const leftOffset = ((minTemp - overallMin) / totalRange) * 100;
  const barWidth = ((maxTemp - minTemp) / totalRange) * 100;

  const gradient = 'bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-500';

  return (
    <div className="flex items-center w-full">
      <span className="text-sm font-medium w-8 text-left opacity-80">{minTemp}°</span>
      <div className="w-full h-1.5 mx-2 rounded-full bg-gray-500/50 relative">
        <div 
          className={`${gradient} h-1.5 rounded-full absolute`}
          style={{ left: `${leftOffset}%`, width: `${barWidth}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8 text-right">{maxTemp}°</span>
    </div>
  );
};

export default TemperatureRangeBar;
