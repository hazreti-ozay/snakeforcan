import { useEffect } from "react";
import { useSnakeGame } from "./hooks/useSnakeGame";
import { Grid } from "./components/Grid";
import { ScoreBoard } from "./components/ScoreBoard";
import { NokiaControls } from "./components/NokiaControls";

function App() {
  const {
    snake,
    food,
    gameOver,
    score,
    isPaused,
    setIsPaused,
    changeDirection,
    resetGame,
  } = useSnakeGame();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }

      if (gameOver) {
        if (e.key === "Enter") resetGame();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection({ x: 1, y: 0 });
          break;
        case "Escape":
        case " ":
          setIsPaused((p) => !p);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, gameOver, resetGame, setIsPaused]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
      {/* Phone Body (Nokia 3310 Style) */}
      <div className="relative flex flex-col items-center bg-[#1f2937] w-[380px] h-[820px] rounded-t-[50px] rounded-b-[40px] shadow-[20px_20px_60px_rgba(0,0,0,0.8),inset_-10px_-10px_20px_rgba(0,0,0,0.4),inset_10px_10px_20px_rgba(255,255,255,0.15)] border-y-[4px] border-x-[2px] border-[#374151] overflow-hidden">
        {/* Top Speaker Earpiece (Realistic 3310 Style) */}
        <div className="flex flex-col items-center gap-1 mt-8 mb-6 opacity-60">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
          </div>
          <div className="flex gap-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
            <div className="w-1.5 h-1.5 bg-[#030712] rounded-full shadow-inner"></div>
          </div>
        </div>

        {/* Screen Bezel (The dark plastic area grouping screen and logo) */}
        <div className="bg-[#111827] w-[85%] p-5 rounded-t-3xl rounded-b-xl shadow-[inset_0px_5px_15px_rgba(0,0,0,0.9),0px_2px_5px_rgba(255,255,255,0.05)] border-t border-[#374151] mb-4 relative z-10">
          {/* OZIDEV Logo (Custom Branding) */}
          <div className="text-center text-xs text-zinc-400 tracking-[3px] font-sans mb-3 font-extrabold select-none shadow-sm">
            OZIDEV
          </div>

          {/* Actual LCD Screen Area */}
          <div className="lcd-screen animate-screen-on relative bg-[#879571] p-3 border-[6px] border-[#1a1c15]/90 rounded-sm shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="screen-glare"></div>
            <div className="lcd-bg-pixels"></div>

            <div className="relative z-50 mix-blend-multiply">
              <ScoreBoard
                score={score}
                gameOver={gameOver}
                isPaused={isPaused}
              />

              <div className="relative">
                <Grid snake={snake} food={food} />

                {gameOver && (
                  <div className="absolute inset-0 bg-[#879571]/90 flex flex-col items-center justify-center font-bold z-10 backdrop-blur-sm">
                    <div className="text-xl mb-4 text-center text-[#111827] drop-shadow-md">
                      GAME OVER
                    </div>
                    <div className="text-[10px] text-center mb-2 text-[#111827]">
                      Score: {score}
                    </div>
                    <div className="text-[8px] animate-pulse mt-4 text-[#111827]">
                      Press ENTER/Btn
                    </div>
                  </div>
                )}

                {isPaused && !gameOver && (
                  <div className="absolute inset-0 bg-[#879571]/90 flex flex-col items-center justify-center font-bold z-10 backdrop-blur-sm">
                    <div className="text-xl animate-pulse text-[#111827] drop-shadow-md">
                      PAUSED
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="scanlines absolute inset-0 z-50 pointer-events-none"></div>
          </div>
        </div>

        {/* Physical Keypad Area */}
        <NokiaControls
          changeDirection={changeDirection}
          setIsPaused={setIsPaused}
          resetGame={resetGame}
          gameOver={gameOver}
        />

        {/* Decorative Dialpad Grid (Non-functional aesthetic) */}
        <div className="grid grid-cols-3 gap-3 w-3/4 opacity-40 mt-8 mb-8 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-[#a3a8b0] rounded-full shadow-inner border border-[#111827]/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
