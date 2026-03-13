import { Cell } from './Cell';
import { GRID_SIZE } from '../hooks/useSnakeGame';

export const Grid = ({ snake, food }) => {
  const cells = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const isSnake = snake.some(
        (segment) => segment.x === x && segment.y === y
      );
      const isFood = food ? food.x === x && food.y === y : false;
      cells.push(<Cell key={`${x}-${y}`} isSnake={isSnake} isFood={isFood} />);
    }
  }

  return (
    <div
      className="w-full relative aspect-square border-2 border-[#111827]/40 p-[1px] bg-black/5"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        gap: '1px',
      }}
    >
      {cells}
    </div>
  );
};
