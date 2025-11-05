
import React from 'react';
import SunriseIcon from './icons/SunriseIcon';
import SunsetIcon from './icons/SunsetIcon';

interface SunTimesProps {
  sunrise: string;
  sunset: string;
}

const SunTimeCard: React.FC<{ title: string; time: string; icon: React.ReactNode }> = ({ title, time, icon }) => (
    <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl flex items-center space-x-4">
        <div className="text-yellow-300">{icon}</div>
        <div>
            <h4 className="text-sm text-white/70 uppercase tracking-wider">{title}</h4>
            <p className="text-2xl font-light mt-1">{time}</p>
        </div>
    </div>
);


const SunTimes: React.FC<SunTimesProps> = ({ sunrise, sunset }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SunTimeCard title="Sunrise" time={sunrise} icon={<SunriseIcon className="w-8 h-8" />} />
            <SunTimeCard title="Sunset" time={sunset} icon={<SunsetIcon className="w-8 h-8" />} />
        </div>
    );
};

export default SunTimes;
