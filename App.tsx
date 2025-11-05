import React, { useState, useEffect, useMemo } from 'react';
import { getWeatherData } from './services/geminiService';
import { WeatherData } from './types';
import LocationsView from './components/LocationsView';
import CurrentWeatherDetails from './components/CurrentWeatherDetails';
import { getWeatherBackgroundClasses, Unit, getFavorites, addFavorite, removeFavorite } from './utils';
import Loader from './components/Loader';

const DEFAULT_LOCATIONS = ['New York', 'London', 'Tokyo'];

const App: React.FC = () => {
  const [locations, setLocations] = useState<WeatherData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appIsLoading, setAppIsLoading] = useState<boolean>(true);
  const [units, setUnits] = useState<Unit>('metric');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setAppIsLoading(true);
      setError(null);
      setFavorites(getFavorites());
      try {
        const weatherPromises = DEFAULT_LOCATIONS.map(city => getWeatherData(city));
        const weatherResults = await Promise.all(weatherPromises);
        setLocations(weatherResults);
      } catch (err) {
        setError('Failed to load initial weather data. Please check your API key and network connection.');
        console.error(err);
      } finally {
        setAppIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleToggleFavorite = (locationName: string) => {
    const isFav = favorites.includes(locationName);
    const newFavorites = isFav ? removeFavorite(locationName) : addFavorite(locationName);
    setFavorites(newFavorites);
  };

  const sortedLocations = useMemo(() => {
    return [...locations].sort((a, b) => {
      const aIsFav = favorites.includes(a.location);
      const bIsFav = favorites.includes(b.location);
      if (aIsFav && !bIsFav) return -1;
      if (!aIsFav && bIsFav) return 1;
      return 0; // Keep original order for same-status items
    });
  }, [locations, favorites]);

  const handleSearch = async (city: string) => {
    const existingLocation = locations.find(loc => loc.location.toLowerCase().includes(city.toLowerCase().split(',')[0]));
    if (existingLocation) {
      setSelectedLocation(existingLocation);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const newLocationData = await getWeatherData(city);
      setLocations(prevLocations => [newLocationData, ...prevLocations.filter(loc => loc.location !== newLocationData.location)]);
      setSelectedLocation(newLocationData);
    } catch (err) {
      setError(`Could not find weather for "${city}". Please try another city.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: WeatherData) => {
    setSelectedLocation(location);
  };

  const handleBack = () => {
    setSelectedLocation(null);
  };

  const handleUnitToggle = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };
  
  const backgroundClasses = selectedLocation
    ? getWeatherBackgroundClasses(selectedLocation.current)
    : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-black';

  if (appIsLoading) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 bg-gray-800`}>
        <Loader message="Fetching weather data..." />
      </div>
    );
  }

  return (
    <main className={`min-h-screen w-full font-sans text-white transition-all duration-500 ${backgroundClasses}`}>
      <div className="relative isolate">
        {selectedLocation ? (
          <CurrentWeatherDetails 
            data={selectedLocation} 
            onBack={handleBack} 
            units={units}
            onUnitToggle={handleUnitToggle}
            isFavorite={favorites.includes(selectedLocation.location)}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <LocationsView
            locations={sortedLocations}
            onSearch={handleSearch}
            onSelectLocation={handleSelectLocation}
            isLoading={isLoading}
            error={error}
            units={units}
            onUnitToggle={handleUnitToggle}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </main>
  );
};

export default App;
