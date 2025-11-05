import React, { useState, useEffect } from 'react';
import SearchIcon from './icons/SearchIcon';
import { getCitySuggestions } from '../services/geminiService';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      getCitySuggestions(query).then(setSuggestions);
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
      setQuery('');
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    onSearch(city);
    setQuery('');
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center w-full relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
          disabled={isLoading}
          autoComplete="off"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon className="w-6 h-6 text-white/70" />
        </div>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-900 rounded-lg mt-2 overflow-hidden border border-white/20 shadow-2xl">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onMouseDown={() => handleSuggestionClick(city)}
              className="px-4 py-3 text-white cursor-pointer hover:bg-white/25 transition-colors"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
