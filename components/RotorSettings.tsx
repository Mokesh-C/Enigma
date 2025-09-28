'use client';

interface RotorSettingsProps {
  positions: string[];
  onPositionChange: (positions: string[]) => void;
  className?: string;
}

export default function RotorSettings({ 
  positions, 
  onPositionChange, 
  className = '' 
}: RotorSettingsProps) {
  
  const handleRotorChange = (index: number, value: string) => {
    const newValue = value.toUpperCase();
    if (/^[A-Z]$/.test(newValue) || newValue === '') {
      const newPositions = [...positions];
      newPositions[index] = newValue || 'A';
      onPositionChange(newPositions);
    }
  };

  const incrementRotor = (index: number) => {
    const currentChar = positions[index];
    const currentNum = currentChar.charCodeAt(0) - 65;
    const newNum = (currentNum + 1) % 26;
    const newChar = String.fromCharCode(newNum + 65);
    
    const newPositions = [...positions];
    newPositions[index] = newChar;
    onPositionChange(newPositions);
  };

  const decrementRotor = (index: number) => {
    const currentChar = positions[index];
    const currentNum = currentChar.charCodeAt(0) - 65;
    const newNum = (currentNum - 1 + 26) % 26;
    const newChar = String.fromCharCode(newNum + 65);
    
    const newPositions = [...positions];
    newPositions[index] = newChar;
    onPositionChange(newPositions);
  };

  const resetRotors = () => {
    onPositionChange(['A', 'A', 'A']);
  };

  return (
    <div className={`bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-2xl border border-slate-600/50 ${className}`}>
      {/* Clean Header */}
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
          ROTOR CONFIGURATION
        </h3>
        <p className="text-slate-400 text-sm">Encryption Key Settings</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mt-3 shadow-lg shadow-blue-500/30"></div>
      </div>
      
      {/* Responsive Layout: Column on mobile, Row on large screens */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Side: Rotor Controls + Reset Buttons */}
        <div className="flex-1">
          {/* Rotor Controls */}
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-6 md:mb-8">
            {positions.map((position, index) => (
              <div key={index} className="text-center">
                {/* Rotor Label */}
                <div className="mb-4">
                  <div className="text-cyan-300 text-lg font-bold mb-1">
                    ROTOR {['III', 'II', 'I'][index]}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {['Left', 'Middle', 'Right'][index]}
                  </div>
                </div>
                
                {/* Rotor Control */}
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-md p-4 border border-slate-600 shadow-2xl">
                  {/* Increment Button */}
                  <button
                    onClick={() => incrementRotor(index)}
                    className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-t-md transition-all duration-200 shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  
                  {/* Position Display */}
                  <div className="bg-black border-2 border-slate-600 text-center py-4 my-2 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => handleRotorChange(index, e.target.value)}
                      className="bg-transparent text-white text-3xl md:text-4xl font-mono font-black text-center w-10 md:w-12 outline-none relative z-10 text-shadow-lg"
                      maxLength={1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-400/10 to-transparent opacity-50"></div>
                  </div>
                  
                  {/* Decrement Button */}
                  <button
                    onClick={() => decrementRotor(index)}
                    className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-b-md transition-all duration-200 shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* Position Info */}
                <div className="mt-4 bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
                  <div className="text-cyan-300 text-sm font-semibold">
                    POS {position.charCodeAt(0) - 64}
                  </div>
                  <div className="text-slate-400 text-xs">
                    of 26
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Reset Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetRotors}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 md:px-8 rounded-md transition-all duration-200 shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              RESET AAA
            </button>
            
            <button
              onClick={() => onPositionChange(['A', 'B', 'C'])}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 md:px-8 rounded-md transition-all duration-200 shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              SET ABC
            </button>
          </div>
        </div>
        
        {/* Right Side: Info Panel */}
        <div className="flex-1 lg:max-w-md">
          <div className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 rounded-md p-4 md:p-6 border border-slate-700/50 h-full">
            <div className="text-center mb-4">
              <div className="text-cyan-300 text-lg font-bold mb-2">
                🔐 ENCRYPTION KEY: {positions.join('-')}
              </div>
              <div className="text-slate-400 text-sm">
                This key setting enables bidirectional encryption
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-900/20 rounded-md p-3 border border-blue-700/30">
                <div className="text-blue-300 font-semibold mb-1">🔒 ENCRYPT</div>
                <div className="text-slate-300 text-xs">Use this key to encode messages</div>
              </div>
              <div className="bg-green-900/20 rounded-md p-3 border border-green-700/30">
                <div className="text-green-300 font-semibold mb-1">🔓 DECRYPT</div>
                <div className="text-slate-300 text-xs">Same key decodes messages</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-slate-800/50 rounded-md border border-slate-700/50">
              <div className="text-slate-300 text-xs leading-relaxed">
                <strong>How it works:</strong> Set your desired rotor positions, then type your message. 
                To decrypt, reset rotors to the same positions and type the encrypted text.
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
