import React from 'react';
import { WeatherData } from '../types';
import SearchBar from './SearchBar';
import LocationCard from './LocationCard';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import UnitToggle from './UnitToggle';
import { Unit } from '../utils';

interface LocationsViewProps {
  locations: WeatherData[];
  onSearch: (city: string) => void;
  onSelectLocation: (location: WeatherData) => void;
  isLoading: boolean;
  error: string | null;
  units: Unit;
  onUnitToggle: () => void;
  favorites: string[];
  onToggleFavorite: (locationName: string) => void;
}

const LocationsView: React.FC<LocationsViewProps> = ({
  locations,
  onSearch,
  onSelectLocation,
  isLoading,
  error,
  units,
  onUnitToggle,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Weather</h1>
        <UnitToggle units={units} onToggle={onUnitToggle} />
      </div>

      <SearchBar onSearch={onSearch} isLoading={isLoading} />

      {error && <ErrorDisplay message={error} />}
      
      {isLoading && locations.length === 0 && <Loader message="Loading..." />}

      <div className="mt-6 space-y-4">
        {locations.map((loc) => (
          <LocationCard 
            key={loc.location} 
            data={loc} 
            onClick={() => onSelectLocation(loc)} 
            units={units}
            isFavorite={favorites.includes(loc.location)}
            onToggleFavorite={() => onToggleFavorite(loc.location)}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsView;