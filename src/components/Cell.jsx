export const Cell = ({ isSnake, isFood }) => {
  return (
    <div
      className={`w-full h-full ${
        isSnake
          ? 'bg-[#111827]'
          : isFood
          ? 'bg-[#111827] animate-[pulse_0.5s_cubic-bezier(0.4,0,0.6,1)_infinite]'
          : 'bg-transparent'
      }`}
      style={{
        borderRadius: 0, // Ensure no rounded borders
        opacity: isSnake ? 1 : isFood ? 0.8 : 1, // Food pulses slightly with Tailwind animation
      }}
    />
  );
};
