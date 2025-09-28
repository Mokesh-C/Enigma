'use client';

interface LampboardProps {
  litLetter?: string;
  className?: string;
}

const LAMPBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Lampboard({ litLetter, className = '' }: LampboardProps) {
  return (
    <div className={`bg-gradient-to-b from-black via-gray-900 to-black p-4 md:p-8 rounded-md shadow-2xl border border-slate-600/50 relative overflow-hidden ${className}`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent"></div>
      
      {/* Header */}
      <div className="text-center mb-4 md:mb-6 relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
          ENCRYPTED OUTPUT
        </h3>
        <p className="text-slate-400 text-sm">Letter Display Panel</p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-3 shadow-lg shadow-yellow-500/30"></div>
      </div>
      
      <div className="space-y-2 md:space-y-4 relative z-10">
        {LAMPBOARD_LAYOUT.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-2 md:gap-3"
            style={{ marginLeft: rowIndex === 1 ? '12px' : rowIndex === 2 ? '24px' : '0' }}
          >
            {row.map((letter) => {
              const isLit = litLetter === letter;
              return (
                <div
                  key={letter}
                  className={`
                    w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center font-black text-lg md:text-xl
                    transition-all duration-300 relative overflow-hidden backdrop-blur-sm
                    ${isLit
                      ? 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 text-black border-yellow-300 shadow-2xl shadow-yellow-400/60 scale-110 md:scale-125 ring-4 ring-yellow-400/40'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 border-gray-600 hover:border-gray-500'
                    }
                  `}
                >
                  {/* Intense glowing effect for lit letters */}
                  {isLit && (
                    <>
                      <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full opacity-80"></div>
                      <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping"></div>
                    </>
                  )}
                  
                  {/* Letter */}
                  <span className={`relative z-10 drop-shadow-lg ${isLit ? 'animate-pulse' : ''}`}>
                    {letter}
                  </span>
                  
                  {/* Reflection effect */}
                  <div className={`absolute top-1 left-1 w-3 h-3 md:w-4 md:h-4 rounded-full ${isLit ? 'bg-white opacity-60' : 'bg-white opacity-10'}`}></div>
                  
                  {/* Unlit lamp subtle glow */}
                  {!isLit && (
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-700/20 to-transparent rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Status Display */}
      <div className="mt-6 md:mt-8 text-center relative z-10">
        <div className="bg-slate-900/50 rounded-md p-3 md:p-4 border border-slate-700/50 inline-block">
          {litLetter ? (
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
              <span className="text-yellow-300 font-bold text-sm md:text-lg">
                LETTER <span className="bg-yellow-800/50 px-2 md:px-3 py-1 rounded font-mono">{litLetter}</span> ACTIVE
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-400 text-xs md:text-sm">
                STANDBY • Awaiting input signal
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
