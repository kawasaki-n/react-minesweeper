import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Minesweeper</h1>
      <button
        onClick={onSettingsClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
        aria-label="Settings"
      >
        <Settings size={24} />
      </button>
    </header>
  );
};

export default Header;
