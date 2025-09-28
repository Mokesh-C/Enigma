// Historical Enigma I Rotor Wirings
export const ROTORS = {
  I: { 
    wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", 
    notch: "Q",
    name: "I" 
  },
  II: { 
    wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", 
    notch: "E",
    name: "II"
  },
  III: { 
    wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", 
    notch: "V",
    name: "III"
  },
  IV: { 
    wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", 
    notch: "J",
    name: "IV"
  },
  V: { 
    wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", 
    notch: "Z",
    name: "V"
  }
};

// Reflector B wiring (most common)
export const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

export interface EncryptionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  input: string;
  output: string;
  details: string;
}

export interface LetterEncryption {
  letter: string;
  finalOutput: string;
  startingPosition: string[];
  endingPosition: string[];
  steps: EncryptionStep[];
}

export interface RotorConfig {
  wiring: string;
  notch: string;
  name: string;
  position: number;
  ringSetting: number;
}

export interface EnigmaSettings {
  rotors: RotorConfig[];
  reflector: string;
  plugboard: { [key: string]: string };
}

export class EnigmaMachine {
  private rotors: RotorConfig[];
  private reflector: string;
  private plugboard: { [key: string]: string };
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private encryptionHistory: LetterEncryption[] = [];

  constructor(settings: EnigmaSettings) {
    this.rotors = JSON.parse(JSON.stringify(settings.rotors)); // Deep copy
    this.reflector = settings.reflector;
    this.plugboard = settings.plugboard;
    this.encryptionHistory = []; // Initialize encryption history
  }

  private charToNum(char: string): number {
    return char.charCodeAt(0) - 65; // A=0, B=1, etc.
  }

  private numToChar(num: number): string {
    return String.fromCharCode(((num % 26) + 26) % 26 + 65);
  }

  private throughPlugboard(char: string): string {
    return this.plugboard[char] || char;
  }

  private throughRotor(char: string, rotor: RotorConfig, reverse: boolean = false): string {
    const pos = rotor.position;
    const ring = rotor.ringSetting;
    
    if (!reverse) {
      // Forward through rotor
      const shift = pos - ring;
      const index = (this.charToNum(char) + shift + 26) % 26;
      const wireLetter = rotor.wiring[index];
      return this.numToChar(this.charToNum(wireLetter) - shift + 26);
    } else {
      // Reverse through rotor
      const shift = pos - ring;
      const adjustedChar = this.numToChar(this.charToNum(char) + shift);
      const wireIndex = rotor.wiring.indexOf(adjustedChar);
      if (wireIndex === -1) return char; // Safety check
      return this.numToChar(wireIndex - shift + 26);
    }
  }

  private throughReflector(char: string): string {
    const index = this.charToNum(char);
    return this.reflector[index];
  }

  private shouldAdvance(rotor: RotorConfig): boolean {
    return this.numToChar(rotor.position) === rotor.notch;
  }

  private advanceRotors(): void {
    // Check for double-stepping (middle rotor advances twice)
    const rightRotor = this.rotors[2];
    const middleRotor = this.rotors[1];
    const leftRotor = this.rotors[0];

    // Double-stepping: if middle rotor is at notch, it advances and causes left to advance
    const middleAtNotch = this.shouldAdvance(middleRotor);
    
    if (middleAtNotch) {
      middleRotor.position = (middleRotor.position + 1) % 26;
      leftRotor.position = (leftRotor.position + 1) % 26;
    }
    
    // Right rotor always advances
    rightRotor.position = (rightRotor.position + 1) % 26;
    
    // If right rotor was at notch, middle advances (unless it already did in double-step)
    if (this.shouldAdvance({ ...rightRotor, position: (rightRotor.position - 1 + 26) % 26 }) && !middleAtNotch) {
      middleRotor.position = (middleRotor.position + 1) % 26;
    }
  }

  public encryptChar(char: string): string {
    // Only process A-Z
    if (!/[A-Z]/.test(char)) return char;

    const startingPositions = this.getRotorPositions();
    const steps: EncryptionStep[] = [];
    let signal = char;

    // Step 1: Through plugboard (first time)
    const plugboardResult1 = this.throughPlugboard(signal);
    steps.push({
      stepNumber: 1,
      title: "PLUGBOARD ENTRY",
      explanation: "Signal enters the plugboard to check for letter swaps",
      input: signal,
      output: plugboardResult1,
      details: plugboardResult1 === signal 
        ? `No plugboard cable connected to ${signal}, so it stays the same`
        : `Plugboard cable swaps ${signal} with ${plugboardResult1}`
    });
    signal = plugboardResult1;

    // Step 2-4: Through rotors (right to left)
    const rotorNames = ['RIGHT ROTOR (I)', 'MIDDLE ROTOR (II)', 'LEFT ROTOR (III)'];
    for (let i = 2; i >= 0; i--) {
      const rotorInput = signal;
      signal = this.throughRotor(signal, this.rotors[i]);
      steps.push({
        stepNumber: steps.length + 1,
        title: rotorNames[2-i],
        explanation: `Signal passes through ${rotorNames[2-i].toLowerCase()} internal wiring`,
        input: rotorInput,
        output: signal,
        details: `At position ${this.numToChar(this.rotors[i].position)}, the rotor's internal wiring connects ${rotorInput} to ${signal}`
      });
    }

    // Step 5: Through reflector
    const reflectorInput = signal;
    signal = this.throughReflector(signal);
    steps.push({
      stepNumber: steps.length + 1,
      title: "REFLECTOR",
      explanation: "Signal bounces back through the reflector - this makes Enigma reversible",
      input: reflectorInput,
      output: signal,
      details: `Reflector permanently pairs ${reflectorInput} with ${signal}. This bounce-back is why the same settings can encrypt AND decrypt!`
    });

    // Step 6-8: Back through rotors (left to right)
    const returnRotorNames = ['LEFT ROTOR (Return)', 'MIDDLE ROTOR (Return)', 'RIGHT ROTOR (Return)'];
    for (let i = 0; i <= 2; i++) {
      const rotorInput = signal;
      signal = this.throughRotor(signal, this.rotors[i], true);
      steps.push({
        stepNumber: steps.length + 1,
        title: returnRotorNames[i],
        explanation: `Signal returns through ${returnRotorNames[i].toLowerCase()} on a different path`,
        input: rotorInput,
        output: signal,
        details: `Return journey uses different internal wiring. ${rotorInput} becomes ${signal} through the reverse path`
      });
    }

    // Step 9: Through plugboard (second time)
    const plugboardInput2 = signal;
    signal = this.throughPlugboard(signal);
    steps.push({
      stepNumber: steps.length + 1,
      title: "PLUGBOARD EXIT",
      explanation: "Signal exits through plugboard for final letter check",
      input: plugboardInput2,
      output: signal,
      details: signal === plugboardInput2
        ? `No plugboard cable connected to ${plugboardInput2}, so the final result is ${signal}`
        : `Plugboard cable swaps ${plugboardInput2} with ${signal} for the final output`
    });

    // Record the complete encryption process
    const letterEncryption: LetterEncryption = {
      letter: char,
      finalOutput: signal,
      startingPosition: startingPositions,
      endingPosition: [], // Will be filled after rotor advancement
      steps: steps
    };

    // Step 10: Advance rotors AFTER encryption
    this.advanceRotors();
    letterEncryption.endingPosition = this.getRotorPositions();

    // Add final step explanation
    steps.push({
      stepNumber: steps.length + 1,
      title: "ROTOR ADVANCEMENT",
      explanation: "Rotors automatically advance like an odometer after each letter",
      input: startingPositions.join('-'),
      output: letterEncryption.endingPosition.join('-'),
      details: `The right rotor moved from ${startingPositions[2]} to ${letterEncryption.endingPosition[2]}. This ensures the next letter will be encrypted differently, even if it's the same letter!`
    });

    // Store in history
    this.encryptionHistory.push(letterEncryption);

    return signal;
  }

  public encryptMessage(message: string): string {
    return message
      .toUpperCase()
      .split('')
      .map(char => this.encryptChar(char))
      .join('');
  }

  public getRotorPositions(): string[] {
    return this.rotors.map(rotor => this.numToChar(rotor.position));
  }

  public setRotorPositions(positions: string[]): void {
    positions.forEach((pos, index) => {
      if (this.rotors[index] && /[A-Z]/.test(pos)) {
        this.rotors[index].position = this.charToNum(pos);
      }
    });
  }

  public resetToPositions(positions: string[]): void {
    this.setRotorPositions(positions);
  }

  public getEncryptionHistory(): LetterEncryption[] {
    return [...this.encryptionHistory];
  }

  public clearEncryptionHistory(): void {
    this.encryptionHistory = [];
  }
}

// Create default Enigma configuration
export const createDefaultEnigma = (initialPositions: string[] = ['A', 'A', 'A']): EnigmaMachine => {
  const settings: EnigmaSettings = {
    rotors: [
      { 
        ...ROTORS.I, 
        position: 0, 
        ringSetting: 0 
      },
      { 
        ...ROTORS.II, 
        position: 0, 
        ringSetting: 0 
      },
      { 
        ...ROTORS.III, 
        position: 0, 
        ringSetting: 0 
      }
    ],
    reflector: REFLECTOR_B,
    plugboard: {} // No plugboard connections for simplicity
  };
  
  const enigma = new EnigmaMachine(settings);
  enigma.setRotorPositions(initialPositions);
  return enigma;
};
