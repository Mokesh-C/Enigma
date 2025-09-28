'use client';

interface TextDisplayProps {
  inputText: string;
  outputText: string;
  onClear: () => void;
  className?: string;
}

export default function TextDisplay({ 
  inputText, 
  outputText, 
  onClear,
  className = '' 
}: TextDisplayProps) {
  return (
    <div className={`bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-sm p-4 md:p-8 rounded-md shadow-2xl border border-slate-600/50 ${className}`}>
      {/* Header */}
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">
          MESSAGE TERMINAL
        </h3>
        <p className="text-slate-400 text-sm">Text Processing Interface</p>
        <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full mt-3 shadow-lg shadow-green-500/30"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Input Text - Order 2 on mobile (reversed) */}
        <div className="space-y-3 md:space-y-4 order-2 lg:order-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-3 rounded-md border border-green-700/30 gap-2">
            <h4 className="text-green-300 font-bold flex items-center gap-2 text-sm md:text-base">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              ORIGINAL MESSAGE
            </h4>
            <span className="text-green-400 text-xs md:text-sm font-mono bg-green-800/30 px-2 py-1 rounded self-start sm:self-auto">
              {inputText.length} CHARS
            </span>
          </div>
          
          <div className="bg-black/70 border-2 border-green-600/50 rounded-md p-3 md:p-6 min-h-[120px] md:min-h-[140px] max-h-[180px] md:max-h-[220px] overflow-y-auto backdrop-blur-sm">
            <div className="text-green-100 font-mono text-sm md:text-lg leading-relaxed break-all">
              {inputText || (
                <span className="text-green-500/60 italic flex items-center gap-2 text-xs md:text-base">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Start typing your message...
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Output Text - Order 1 on mobile (reversed) */}
        <div className="space-y-3 md:space-y-4 order-1 lg:order-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-3 rounded-md border border-yellow-700/30 gap-2">
            <h4 className="text-yellow-300 font-bold flex items-center gap-2 text-sm md:text-base">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              ENCRYPTED MESSAGE
            </h4>
            <span className="text-yellow-400 text-xs md:text-sm font-mono bg-yellow-800/30 px-2 py-1 rounded self-start sm:self-auto">
              {outputText.length} CHARS
            </span>
          </div>
          
          <div className="bg-black/70 border-2 border-yellow-600/50 rounded-md p-3 md:p-6 min-h-[120px] md:min-h-[140px] max-h-[180px] md:max-h-[220px] overflow-y-auto backdrop-blur-sm">
            <div className="text-yellow-100 font-mono text-sm md:text-lg leading-relaxed break-all">
              {outputText || (
                <span className="text-yellow-500/60 italic flex items-center gap-2 text-xs md:text-base">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Encrypted output will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <button
          onClick={onClear}
          disabled={!inputText && !outputText}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-md transition-all duration-200 shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          CLEAR TERMINAL
        </button>
        
        <button
          onClick={() => {
            if (outputText) {
              navigator.clipboard.writeText(outputText);
            }
          }}
          disabled={!outputText}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-md transition-all duration-200 shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          COPY ENCRYPTED
        </button>
      </div>
      
      {/* Instructions Panel */}
      <div className="mt-6 md:mt-8 bg-gradient-to-r from-slate-900/50 to-gray-900/50 rounded-md p-4 md:p-6 border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Operation Instructions */}
          <div>
            <h5 className="text-slate-300 font-bold mb-3 flex items-center gap-2 text-sm md:text-base">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              HOW IT WORKS
            </h5>
            <ul className="text-slate-400 text-xs md:text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">1.</span>
                <span><strong>ENCRYPT:</strong> Set rotor positions → Type your message</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 font-bold">2.</span>
                <span><strong>SHARE:</strong> Copy encrypted text to share securely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span><strong>DECRYPT:</strong> Reset to same positions → Type encrypted text</span>
              </li>
            </ul>
          </div>
          
          {/* Security Notice */}
          <div>
            <h5 className="text-slate-300 font-bold mb-3 flex items-center gap-2 text-sm md:text-base">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ENCRYPTION DETAILS
            </h5>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-md p-3">
              <p className="text-blue-300 text-xs md:text-sm font-semibold">🔐 BIDIRECTIONAL ENCRYPTION</p>
              <p className="text-slate-400 text-xs mt-1">
                Both sender and receiver must use identical rotor positions. 
                The same settings encrypt and decrypt messages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
