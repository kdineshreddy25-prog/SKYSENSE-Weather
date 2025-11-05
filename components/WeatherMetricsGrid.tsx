
import React from 'react';
import { CurrentWeather } from '../types';
import { Unit, convertSpeed, convertDistance, getUvIndexInfo } from '../utils';

interface WeatherMetricsGridProps {
  metrics: CurrentWeather;
  units: Unit;
}

const MetricCard: React.FC<{ title: string; value: string | number; unit?: string }> = ({ title, value, unit }) => (
    <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl flex flex-col">
        <h4 className="text-sm text-white/70 uppercase tracking-wider">{title}</h4>
        <p className="text-3xl font-light mt-1">
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
        </p>
    </div>
);

const getAqiInfo = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-400' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-400' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-500' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-500' };
    return { level: 'Hazardous', color: 'text-red-700' };
};


const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ metrics, units }) => {
    const aqiInfo = metrics.aqi ? getAqiInfo(metrics.aqi) : null;
    const uvInfo = getUvIndexInfo(metrics.uvIndex);

    const windSpeed = convertSpeed(metrics.windSpeed, units);
    const windUnit = units === 'metric' ? 'km/h' : 'mph';
    const visibility = convertDistance(metrics.visibility, units);
    const visibilityUnit = units === 'metric' ? 'km' : 'mi';

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Wind Speed" value={windSpeed} unit={windUnit} />
                <MetricCard title="Humidity" value={metrics.humidity} unit="%" />
                <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl flex flex-col">
                    <h4 className="text-sm text-white/70 uppercase tracking-wider">UV Index</h4>
                    <div className="flex items-baseline mt-1 space-x-2">
                        <p className="text-3xl font-light">{metrics.uvIndex}</p>
                        <p className={`font-medium ${uvInfo.color}`}>{uvInfo.level}</p>
                    </div>
                </div>
                <MetricCard title="Visibility" value={visibility} unit={visibilityUnit} />
            </div>
             {metrics.aqi && aqiInfo && (
                <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl flex flex-col mt-4">
                    <h4 className="text-sm text-white/70 uppercase tracking-wider">Air Quality</h4>
                    <div className="flex items-baseline mt-1 space-x-2">
                        <p className="text-3xl font-light">{metrics.aqi}</p>
                        <p className={`font-medium ${aqiInfo.color}`}>{aqiInfo.level}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherMetricsGrid;