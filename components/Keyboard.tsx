'use client';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  pressedKey?: string;
}

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({ onKeyPress, pressedKey }: KeyboardProps) {
  return (
    <div className="bg-gradient-to-b from-slate-800/90 to-gray-900/90 backdrop-blur-sm p-4 md:p-8 rounded-md shadow-2xl border border-slate-600/50">
      {/* Header */}
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
          ENIGMA KEYBOARD
        </h3>
        <p className="text-slate-400 text-sm">Interactive Input Interface</p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full mt-3 shadow-lg shadow-yellow-500/30"></div>
      </div>
      
      <div className="space-y-2 md:space-y-4">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-1 md:gap-3"
            style={{ marginLeft: rowIndex === 1 ? '12px' : rowIndex === 2 ? '24px' : '0' }}
          >
            {row.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md font-black text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200 transform relative overflow-hidden
                  border-2 shadow-lg backdrop-blur-sm
                  ${pressedKey === key
                    ? 'bg-gradient-to-b from-yellow-400 to-orange-500 text-black border-yellow-400 scale-90 shadow-2xl shadow-yellow-400/50 ring-2 md:ring-4 ring-yellow-400/30'
                    : 'bg-gradient-to-b from-slate-300 to-slate-400 hover:from-slate-200 hover:to-slate-300 text-gray-900 border-slate-400 hover:scale-110 active:scale-95 hover:shadow-xl'
                  }
                `}
              >
                {/* Glossy effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-md"></div>
                
                {/* Key letter */}
                <span className="relative z-10 drop-shadow-sm">{key}</span>
                
                {/* Active glow effect */}
                {pressedKey === key && (
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-md animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="mt-6 md:mt-8 text-center">
        <div className="bg-slate-900/50 rounded-md p-3 md:p-4 border border-slate-700/50 inline-block">
          <p className="text-slate-300 text-xs md:text-sm mb-1 flex items-center justify-center gap-2">
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <strong>INPUT METHOD:</strong> Click keys or use physical keyboard
          </p>
          <p className="text-slate-400 text-xs">
            A-Z letters only • Each keystroke advances rotors
          </p>
        </div>
      </div>
    </div>
  );
}
