import { useState, useCallback, useRef, useEffect } from 'react';
import { useInterval } from './useInterval';

export const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // UP
const INITIAL_SPEED = 200;

const generateFood = (currentSnake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    const isOnSnake = currentSnake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
    if (!isOnSnake) break;
  }
  return newFood;
};

export function useSnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 10, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);

  // Keep track of the last processed direction to prevent 180-degree quick turn self-collisions
  const lastProcessedDirectionRef = useRef(INITIAL_DIRECTION);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    lastProcessedDirectionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  }, []);

  const quitGame = useCallback(() => {
    setGameOver(true);
    setIsPaused(false);
  }, []);

  const changeDirection = useCallback((newDir) => {
    // Prevent 180 degree turns based on the LAST PROCESSED direction, not current state
    const currentProcessed = lastProcessedDirectionRef.current;
    if (
      (newDir.x !== 0 && currentProcessed.x === -newDir.x) ||
      (newDir.y !== 0 && currentProcessed.y === -newDir.y)
    ) {
      return;
    }
    setDirection(newDir);
  }, []);

  const gameLoop = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Collision with self
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Eating food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10); // 10 points per apple
        setFood(generateFood(newSnake));
        // Increase speed slightly, down to a minimum of 60ms
        setSpeed((s) => Math.max(60, s - 5));
      } else {
        newSnake.pop(); // Remove tail if not ate food
      }

      // Mark this direction as processed
      lastProcessedDirectionRef.current = direction;

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused]);

  useInterval(gameLoop, gameOver || isPaused ? null : speed);

  return {
    snake,
    direction,
    food,
    gameOver,
    score,
    isPaused,
    setIsPaused,
    changeDirection,
    resetGame,
    quitGame,
  };
}
