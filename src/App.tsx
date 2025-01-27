import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [boardSize, setBoardSize] = useState(10);
  const [mineCount, setMineCount] = useState(20);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateSettings = (size: number, mines: number) => {
    setBoardSize(size);
    setMineCount(mines);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow flex flex-col">
        <Header onSettingsClick={toggleSettings} />
        <div className="flex-grow flex items-center justify-center">
          {showSettings ? (
            <Settings
              boardSize={boardSize}
              mineCount={mineCount}
              onSave={updateSettings}
              onBack={toggleSettings}
            />
          ) : (
            <Board size={boardSize} mineCount={mineCount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
