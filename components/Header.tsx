
import React from 'react';
import ListIcon from './icons/ListIcon';
import UnitToggle from './UnitToggle';
import { Unit } from '../utils';

interface HeaderProps {
    onBack: () => void;
    units: Unit;
    onUnitToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack, units, onUnitToggle }) => {
    return (
        <header className="flex justify-between items-center">
            <UnitToggle units={units} onToggle={onUnitToggle} />
            <button 
                onClick={onBack} 
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Back to locations list"
            >
                <ListIcon className="w-6 h-6 text-white" />
            </button>
        </header>
    );
}

export default Header;
