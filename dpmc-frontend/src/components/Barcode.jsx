import React from 'react';

// Code 39 specifications: 5 bars, 4 spaces. 
// '1' indicates a bar (black), '0' indicates a space (white).
const CODE39_MAP = {
  '0': '101001101101', '1': '110100101011', '2': '101100101011', '3': '110110010101',
  '4': '101001101011', '5': '110100110101', '6': '101100110101', '7': '101001011011',
  '8': '110100101101', '9': '101100101101', 'A': '110101001011', 'B': '101101001011',
  'C': '110110100101', 'D': '101011001011', 'E': '110101100101', 'F': '101101100101',
  'G': '101010011011', 'H': '110101001101', 'I': '101101001101', 'J': '101011001101',
  'K': '110101010011', 'L': '101101010011', 'M': '110110101001', 'N': '101011010011',
  'O': '110101101001', 'P': '101101101001', 'Q': '101010110011', 'R': '110101011001',
  'S': '101101011001', 'T': '101011011001', 'U': '110010101011', 'V': '100110101011',
  'W': '110011010101', 'X': '100101101011', 'Y': '110010110101', 'Z': '100110110101',
  '-': '100101011011', '.': '110010101101', ' ': '100110101101', '*': '100101101101',
  '$': '100100100101', '/': '100100101001', '+': '100101001001', '%': '101001001001'
};

export default function Barcode({ value, height = 32, width = 1.2 }) {
  if (!value) return null;

  // Code 39 uses uppercase characters. Start & stop characters are '*'
  const cleanValue = `*${value.toUpperCase()}*`;
  
  let pattern = '';
  for (let i = 0; i < cleanValue.length; i++) {
    const char = cleanValue[i];
    const charPattern = CODE39_MAP[char] || CODE39_MAP[' ']; // fallback to space if invalid character
    pattern += charPattern + '0'; // Add space between character blocks
  }

  const totalWidth = pattern.length * width;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg 
        width={totalWidth} 
        height={height} 
        style={{ display: 'block', color: 'hsl(var(--foreground))' }}
      >
        {pattern.split('').map((bit, idx) => {
          if (bit === '1') {
            return (
              <rect
                key={idx}
                x={idx * width}
                y={0}
                width={width}
                height={height}
                fill="currentColor"
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}
