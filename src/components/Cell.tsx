import React from 'react';
import { Flag } from 'lucide-react';

interface CellProps {
  data: {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
  };
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ data, onClick, onRightClick }) => {
  const getCellContent = () => {
    if (data.isFlagged) return <Flag size={16} />;
    if (!data.isRevealed) return '';
    if (data.isMine) return '💣';
    if (data.neighborMines === 0) return '';
    return <span className="font-bold">{data.neighborMines}</span>;
  };

  const getCellColor = () => {
    if (!data.isRevealed) return 'bg-gray-300';
    if (data.isMine) return 'bg-red-500';
    switch (data.neighborMines) {
      case 1: return 'text-blue-500';
      case 2: return 'text-green-500';
      case 3: return 'text-red-500';
      case 4: return 'text-purple-500';
      case 5: return 'text-yellow-500';
      case 6: return 'text-pink-500';
      case 7: return 'text-orange-500';
      case 8: return 'text-gray-700';
      default: return '';
    }
  };

  return (
    <button
      className={`w-8 h-8 flex items-center justify-center border border-gray-400 ${getCellColor()}`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {getCellContent()}
    </button>
  );
};

export default Cell;
