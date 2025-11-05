
import React from 'react';
import { Unit } from '../utils';

interface UnitToggleProps {
  units: Unit;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ units, onToggle }) => {
  return (
    <div className="flex items-center bg-white/20 p-1 rounded-full">
      <button
        onClick={units === 'imperial' ? onToggle : undefined}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
          units === 'metric' ? 'bg-white text-blue-800' : 'text-white hover:bg-white/10'
        }`}
        aria-pressed={units === 'metric'}
      >
        °C
      </button>
      <button
        onClick={units === 'metric' ? onToggle : undefined}
        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
          units === 'imperial' ? 'bg-white text-blue-800' : 'text-white hover:bg-white/10'
        }`}
        aria-pressed={units === 'imperial'}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
