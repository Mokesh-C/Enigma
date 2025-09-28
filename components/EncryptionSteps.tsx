'use client';

import { useState } from 'react';

interface EncryptionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  input: string;
  output: string;
  details: string;
}

interface LetterEncryption {
  letter: string;
  finalOutput: string;
  startingPosition: string[];
  endingPosition: string[];
  steps: EncryptionStep[];
}

interface EncryptionStepsProps {
  letterEncryptions: LetterEncryption[];
  className?: string;
}

export default function EncryptionSteps({ letterEncryptions, className = '' }: EncryptionStepsProps) {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openLetters, setOpenLetters] = useState<Set<number>>(new Set());

  const toggleLetter = (index: number) => {
    const newOpenLetters = new Set(openLetters);
    if (newOpenLetters.has(index)) {
      newOpenLetters.delete(index);
    } else {
      newOpenLetters.add(index);
    }
    setOpenLetters(newOpenLetters);
  };

  if (letterEncryptions.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-sm rounded-md border border-slate-600/50 shadow-lg ${className}`}>
      {/* Main Dropdown Header */}
      <button
        onClick={() => setIsMainOpen(!isMainOpen)}
        className="w-full p-3 md:p-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors rounded-md"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white">
              🔍 How Encryption Works
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Step-by-step breakdown of {letterEncryptions.length} letter{letterEncryptions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transform transition-transform ${isMainOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Main Content */}
      {isMainOpen && (
        <div className="border-t border-slate-600/50">
          <div className="p-3 md:p-4 space-y-2 md:space-y-3">
            {letterEncryptions.map((letterEnc, index) => (
              <div key={index} className="border border-slate-600/30 rounded-md bg-slate-900/30">
                {/* Letter Dropdown Header */}
                <button
                  onClick={() => toggleLetter(index)}
                  className="w-full p-2 md:p-3 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors rounded-md"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded text-white text-xs md:text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-white font-semibold text-sm md:text-base">
                        Letter: <span className="bg-slate-700 px-1 md:px-2 py-1 rounded font-mono text-xs md:text-sm">{letterEnc.letter}</span>
                        {' → '}
                        <span className="bg-yellow-600 px-1 md:px-2 py-1 rounded font-mono text-xs md:text-sm">{letterEnc.finalOutput}</span>
                      </span>
                      <div className="text-xs text-slate-400 mt-1">
                        Rotors: {letterEnc.startingPosition.join('-')} → {letterEnc.endingPosition.join('-')}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-3 h-3 md:w-4 md:h-4 text-slate-400 transform transition-transform ${openLetters.has(index) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Letter Steps Content */}
                {openLetters.has(index) && (
                  <div className="border-t border-slate-600/30 p-3 md:p-4">
                    <div className="space-y-3 md:space-y-4">
                      {letterEnc.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="bg-slate-800/50 rounded-md p-3 md:p-4 border border-slate-600/20">
                          {/* Step Header */}
                          <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {step.stepNumber}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-cyan-300 font-semibold text-xs md:text-sm">
                                {step.title}
                              </h4>
                              <p className="text-slate-300 text-xs md:text-sm mt-1">
                                {step.explanation}
                              </p>
                            </div>
                          </div>

                          {/* Step Process */}
                          <div className="ml-7 md:ml-9">
                            <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                              <span className="bg-slate-700 px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm text-white">
                                {step.input}
                              </span>
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="bg-yellow-600 px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm text-white">
                                {step.output}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">
                              {step.details}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Summary */}
                      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-md p-3 md:p-4 border border-green-700/30">
                        <h4 className="text-green-300 font-semibold text-xs md:text-sm mb-2 flex items-center gap-2">
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Final Result
                        </h4>
                        <p className="text-slate-300 text-xs md:text-sm">
                          Letter <span className="font-mono bg-slate-700 px-1 rounded text-xs">{letterEnc.letter}</span> was 
                          encrypted through 9 steps to become <span className="font-mono bg-yellow-600 px-1 rounded text-xs">{letterEnc.finalOutput}</span>.
                          The rotors then moved from <span className="font-mono text-xs">{letterEnc.startingPosition.join('-')}</span> to <span className="font-mono text-xs">{letterEnc.endingPosition.join('-')}</span>,
                          so the next letter will be encrypted differently!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
