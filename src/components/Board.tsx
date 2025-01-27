import React, { useState, useEffect } from 'react';
import Cell from './Cell';

interface BoardProps {
  size: number;
  mineCount: number;
}

interface CellData {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const Board: React.FC<BoardProps> = ({ size, mineCount }) => {
  const [board, setBoard] = useState<CellData[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, [size, mineCount]);

  const initializeBoard = () => {
    const newBoard: CellData[][] = [];
    for (let i = 0; i < size; i++) {
      newBoard.push(Array(size).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      })));
    }

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].neighborMines = countNeighborMines(newBoard, row, col);
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
  };

  const countNeighborMines = (board: CellData[][], row: number, col: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (board[newRow][newCol].isMine) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].isRevealed || board[row][col].isFlagged) return;

    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      revealAllMines(newBoard);
    } else if (newBoard[row][col].neighborMines === 0) {
      revealEmptyCells(newBoard, row, col);
    }

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const revealEmptyCells = (board: CellData[][], row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (!board[newRow][newCol].isRevealed && !board[newRow][newCol].isMine) {
            board[newRow][newCol].isRevealed = true;
            if (board[newRow][newCol].neighborMines === 0) {
              revealEmptyCells(board, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const revealAllMines = (board: CellData[][]) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col].isMine) {
          board[row][col].isRevealed = true;
        }
      }
    }
  };

  const checkWinCondition = (board: CellData[][]) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!board[row][col].isMine && !board[row][col].isRevealed) {
          return;
        }
      }
    }
    setGameWon(true);
  };

  const resetGame = () => {
    initializeBoard();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onRightClick={(e) => handleCellRightClick(e, rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      {gameOver && (
        <div className="text-red-600 font-bold text-xl mb-4">
          Game Over! You hit a mine.
        </div>
      )}
      {gameWon && (
        <div className="text-green-600 font-bold text-xl mb-4">
          Congratulations! You won!
        </div>
      )}
      {(gameOver || gameWon) && (
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Board;
