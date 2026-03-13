export const NokiaControls = ({ changeDirection, setIsPaused, resetGame, quitGame, gameOver, isPaused }) => {

  // A helper function to trigger the direction immediately when pressed
  const handleDir = (dir) => (e) => {
    e.preventDefault();
    changeDirection(dir);
  };

  const handleAction = (e) => {
    e.preventDefault();
    if (gameOver) {
      resetGame();
    } else {
      setIsPaused(p => !p);
    }
  };

  const handleQuit = (e) => {
    e.preventDefault();
    if (!gameOver) {
      quitGame();
    }
  };

  // Advanced button styling for molded plastic feel
  const dpadStyle = `
    flex items-center justify-center 
    bg-gradient-to-b from-[#b5b9c0] to-[#8a8f96]
    text-[#1a1c15] font-black text-xs md:text-sm
    rounded-lg
    border-t border-[#dce1e6] border-b-2 border-[#5a5f66]
    shadow-[0_4px_4px_rgba(0,0,0,0.4),0_2px_0_#5a5f66]
    active:translate-y-[2px] active:shadow-[0_1px_1px_rgba(0,0,0,0.5),0_0px_0_#5a5f66] active:border-b
    transition-all duration-75 select-none
  `;

  // Wide pill button styling
  const actionStyle = `
    flex items-center justify-center
    bg-gradient-to-b from-[#1e293b] to-[#0f172a]
    text-zinc-200 font-extrabold text-[10px] tracking-wider
    rounded-full px-6 py-2
    border-t border-[#334155] border-b-2 border-[#020617]
    shadow-[0_4px_6px_rgba(0,0,0,0.6),0_2px_0_#020617]
    active:translate-y-[2px] active:shadow-[0_1px_2px_rgba(0,0,0,0.6),0_0px_0_#020617] active:border-b
    transition-all duration-75 select-none
  `;

  return (
    <div className="w-full flex justify-between items-center mt-6 px-6 relative z-10">
      {/* Central D-PAD Cluster */}
      <div className="relative w-36 h-36">
        {/* UP - Arrow up wedge */}
        <button 
          onPointerDown={handleDir({ x: 0, y: -1 })}
          className={`absolute top-0 left-12 w-12 h-10 ${dpadStyle}`}
          style={{clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '4px 4px 0 0'}}
        >
          ▲
        </button>
        {/* LEFT */}
        <button 
          onPointerDown={handleDir({ x: -1, y: 0 })}
          className={`absolute top-10 left-2 w-10 h-12 ${dpadStyle}`}
          style={{clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)', borderRadius: '4px 0 0 4px'}}
        >
          ◀
        </button>
        {/* CENTER / EMPTY */}
        <div className="absolute top-10 left-12 w-12 h-12 bg-gradient-to-tr from-[#9a9fa6] to-[#b5b9c0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] z-0 rounded-md" />
        {/* RIGHT */}
        <button 
          onPointerDown={handleDir({ x: 1, y: 0 })}
          className={`absolute top-10 left-24 w-10 h-12 ${dpadStyle}`}
          style={{clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)', borderRadius: '0 4px 4px 0'}}
        >
          ▶
        </button>
        {/* DOWN */}
        <button 
          onPointerDown={handleDir({ x: 0, y: 1 })}
          className={`absolute top-22 left-12 w-12 h-10 ${dpadStyle}`}
          style={{clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)', borderRadius: '0 0 4px 4px'}}
        >
          ▼
        </button>
      </div>

      {/* Action / Nav Button Area */}
      <div className="flex flex-col items-center justify-center gap-6 mb-4 mr-2">
        <button 
          onPointerDown={handleAction}
          className={actionStyle}
        >
          {gameOver ? 'START' : isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        <button 
          onPointerDown={handleQuit}
          className={actionStyle.replace('from-[#1e293b] to-[#0f172a]', 'from-[#b5b9c0] to-[#8a8f96]').replace('text-zinc-200', 'text-zinc-800')}
          style={{ opacity: gameOver ? 0.8 : 1, cursor: gameOver ? 'not-allowed' : 'pointer' }}
          disabled={gameOver}
        >
          QUIT
        </button>
      </div>
    </div>
  );
};
