"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NextPage } from "next";

const TicTacToe404: NextPage = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (board: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    setIsXNext(false);
  };

  const computerMove = () => {
    const emptyIndices = board
      .map((cell, idx) => (cell === "" ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0 || winner) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = board.slice();
    newBoard[randomIndex as number] = "O";
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setIsXNext(true);
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mb-8"
      >
        <p className="text-center text-lg">
          But hey, why not play a quick game of Tic-Tac-Toe?
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-4 w-64"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {board.map((cell, index) => (
          <motion.div
            key={index}
            className={`cell-${index} bg-gray-800 rounded-lg flex items-center justify-center text-4xl font-bold cursor-pointer h-20 w-20`}
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {cell}
          </motion.div>
        ))}
      </motion.div>

      {winner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-2xl font-bold">{winner} wins!</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={resetGame}
          >
            Play Again
          </button>
        </motion.div>
      )}

      {!winner && board.every((cell) => cell !== "") && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-2xl font-bold">It is a tie!</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={resetGame}
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TicTacToe404;
