import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SettingsProps {
  boardSize: number;
  mineCount: number;
  onSave: (size: number, mines: number) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ boardSize, mineCount, onSave, onBack }) => {
  const [size, setSize] = useState(boardSize);
  const [mines, setMines] = useState(mineCount);

  const handleSave = () => {
    onSave(size, mines);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Board Size:</label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="5"
          max="20"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Mine Count:</label>
        <input
          type="number"
          value={mines}
          onChange={(e) => setMines(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
          max={size * size - 1}
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
