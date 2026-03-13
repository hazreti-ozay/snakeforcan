export const ScoreBoard = ({ score, gameOver, isPaused }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-[320px] mb-2 text-[#111827] border-b-4 border-[#111827] pb-2">
      <div className="text-sm font-bold">SCORE:{score.toString().padStart(4, '0')}</div>
      <div className="text-xs">
         {gameOver ? 'GAME OVER' : isPaused ? 'PAUSED' : 'PLAYING'}
      </div>
    </div>
  );
};
