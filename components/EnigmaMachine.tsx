'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { EnigmaMachine as EnigmaEngine, createDefaultEnigma } from '../utils/enigma-logic';
import Keyboard from './Keyboard';
import Lampboard from './Lampboard';
import RotorSettings from './RotorSettings';
import TextDisplay from './TextDisplay';
import EncryptionSteps from './EncryptionSteps';

export default function EnigmaMachine() {
  const [enigma, setEnigma] = useState<EnigmaEngine>(() => createDefaultEnigma());
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [currentLit, setCurrentLit] = useState<string>('');
  const [pressedKey, setPressedKey] = useState<string>('');
  const [rotorPositions, setRotorPositions] = useState(['A', 'A', 'A']);
  
  const litTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const keyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle individual character encryption
  const handleKeyPress = useCallback((key: string) => {
    const upperKey = key.toUpperCase();
    if (!/[A-Z]/.test(upperKey)) return;

    // Clear previous timeouts
    if (litTimeoutRef.current) clearTimeout(litTimeoutRef.current);
    if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);

    // Show pressed key
    setPressedKey(upperKey);
    
    // Encrypt the character
    const encryptedChar = enigma.encryptChar(upperKey);
    
    // Update text states
    setInputText(prev => prev + upperKey);
    setOutputText(prev => prev + encryptedChar);
    
    // Light up the encrypted letter
    setCurrentLit(encryptedChar);
    
    // Update rotor positions display
    setRotorPositions(enigma.getRotorPositions());
    
    // Clear lit letter after animation
    litTimeoutRef.current = setTimeout(() => {
      setCurrentLit('');
    }, 500);
    
    // Clear pressed key after animation
    keyTimeoutRef.current = setTimeout(() => {
      setPressedKey('');
    }, 150);
  }, [enigma]);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      // Only process A-Z letters
      if (/^[A-Z]$/.test(key)) {
        event.preventDefault();
        handleKeyPress(key);
      } else if (event.key.length === 1) {
        // Prevent default for other single characters to avoid unwanted behavior
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Handle rotor position changes
  const handleRotorPositionChange = useCallback((positions: string[]) => {
    // Create new Enigma with updated positions
    const newEnigma = createDefaultEnigma(positions);
    newEnigma.clearEncryptionHistory();
    setEnigma(newEnigma);
    setRotorPositions(positions);
  }, []);

  // Clear all text
  const clearText = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCurrentLit('');
    setPressedKey('');
    
    // Reset Enigma to current rotor positions and clear history
    const newEnigma = createDefaultEnigma(rotorPositions);
    newEnigma.clearEncryptionHistory();
    setEnigma(newEnigma);
  }, [rotorPositions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Clean Professional Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-4 tracking-wider">
            ENIGMA MACHINE
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-4 font-light px-4">
            Professional Encryption Simulator
          </p>
          <div className="w-32 md:w-40 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-blue-500/50"></div>
        </div>

        {/* Rotor Settings */}
        <RotorSettings 
          positions={rotorPositions}
          onPositionChange={handleRotorPositionChange}
        />

        {/* Main Display Area */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Lampboard */}
          <Lampboard 
            litLetter={currentLit}
            className="order-2 xl:order-1"
          />

          {/* Text Display */}
          <TextDisplay 
            inputText={inputText}
            outputText={outputText}
            onClear={clearText}
            className="order-1 xl:order-2"
          />
        </div>

        {/* Keyboard */}
        <Keyboard 
          onKeyPress={handleKeyPress}
          pressedKey={pressedKey}
        />

        {/* Encryption Steps Visualization */}
        <EncryptionSteps 
          letterEncryptions={enigma?.getEncryptionHistory ? enigma.getEncryptionHistory() : []}
          className="mt-6"
        />

        {/* Status Bar */}
        <div className="rounded-md p-4 md:p-6">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {/* Current Key */}
            <div className="flex items-center gap-2 md:gap-3 border border-blue-700/50 px-3 md:px-4 py-2 rounded-md">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3.586l6.879-6.879A6 6 0 0119 9z" />
              </svg>
              <span className="text-blue-300 text-sm md:text-base">KEY:</span>
              <span className="font-mono font-bold text-blue-100 bg-blue-800/50 px-1 md:px-2 py-1 rounded text-sm md:text-base">{rotorPositions.join('-')}</span>
            </div>
            
            {/* Message Count */}
            <div className="flex items-center gap-2 md:gap-3 border border-purple-700/50 px-3 md:px-4 py-2 rounded-md">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
              </svg>
              <span className="text-purple-300 text-sm md:text-base">CHARS:</span>
              <span className="font-bold text-purple-100 text-sm md:text-base">{inputText.length}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 md:py-6 border-t border-slate-700/50">
          <div className="rounded-md p-3 md:p-4 inline-block">
            <p className="text-slate-400 text-xs md:text-sm mb-2">
              🔐 <strong>PROFESSIONAL</strong> • Historical Enigma I Simulation • Type or Click to Encrypt
            </p>
            <p className="text-slate-500 text-xs mb-2">
              Identical rotor positions enable bidirectional encryption • Built with historical accuracy
            </p>
            <div className="pt-2 mt-2">
              <p className="text-slate-400 text-xs">
                <strong>Created by:</strong> <span className="text-blue-400">Dharani Kumar S</span> • <span className="text-slate-500">(24-PMT-048)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
