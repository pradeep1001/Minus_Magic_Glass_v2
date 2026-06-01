/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export type MinuPose = 
  | 'idle' 
  | 'waving' 
  | 'pointing' 
  | 'thinking' 
  | 'surprised' 
  | 'celebrating' 
  | 'clapping' 
  | 'empathetic' 
  | 'oops' 
  | 'afk_yawning' 
  | 'holding_255' 
  | 'holding_lens' 
  | 'holding_matrix' 
  | 'pulling_lever';

interface MinuCharacterProps {
  pose: MinuPose;
  className?: string;
  size?: number | string;
}

export default function MinuCharacter({ pose, className = '', size = '100%' }: MinuCharacterProps) {
  const [hasError, setHasError] = useState(false);

  // If pose changes, reset the error state to try loading the new file
  useEffect(() => {
    setHasError(false);
  }, [pose]);

  // Construct correct relative asset paths for the user-uploaded PNG files
  const imagePath = `/assets/minu_${pose}.png`;

  // Float animation class applied outer-most for kid friendliness
  const floatClass = "animate-float";

  if (hasError) {
    // Elegant and extremely customizable vector alien fallback representing Minu
    // with different facial expressions of mouth & eyes based on active pose!
    const getMouthAndEyes = () => {
      switch (pose) {
        case 'surprised':
        case 'oops':
          return (
            <>
              {/* Surprised eyes */}
              <ellipse cx="152" cy="225" rx="22" ry="26" fill="#1e1b4b" />
              <circle cx="146" cy="215" r="8" fill="#ffffff" />
              <ellipse cx="248" cy="225" rx="22" ry="26" fill="#1e1b4b" />
              <circle cx="242" cy="215" r="8" fill="#ffffff" />
              {/* Open round mouth */}
              <circle cx="200" cy="262" r="14" fill="#db2777" stroke="#1e293b" strokeWidth="3" />
            </>
          );
        case 'thinking':
          return (
            <>
              {/* Skeptical or thinking eyes */}
              <ellipse cx="152" cy="225" rx="20" ry="14" fill="#1e1b4b" />
              <circle cx="148" cy="221" r="5" fill="#ffffff" />
              <ellipse cx="248" cy="225" rx="20" ry="24" fill="#1e1b4b" />
              <circle cx="242" cy="215" r="7" fill="#ffffff" />
              {/* Thinking loop mouth */}
              <path d="M 185 258 Q 200 250, 215 258" stroke="#1e293b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          );
        case 'celebrating':
        case 'clapping':
          return (
            <>
              {/* Super happy eyes (arcs) */}
              <path d="M 132 230 Q 152 210, 172 230" stroke="#1e1b4b" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 228 230 Q 248 210, 268 230" stroke="#1e1b4b" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Huge smile */}
              <path d="M 175 248 Q 200 278, 225 248" fill="#db2777" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            </>
          );
        default:
          return (
            <>
              {/* Cute smiling eyes */}
              <ellipse cx="152" cy="225" rx="20" ry="24" fill="#1e1b4b" />
              <circle cx="146" cy="215" r="7" fill="#ffffff" />
              <circle cx="158" cy="235" r="3" fill="#ffffff" />
              <ellipse cx="248" cy="225" rx="20" ry="24" fill="#1e1b4b" />
              <circle cx="242" cy="215" r="7" fill="#ffffff" />
              <circle cx="254" cy="235" r="3" fill="#ffffff" />
              {/* Cute smile */}
              <path d="M 180 252 Q 200 274, 220 252" fill="#db2777" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            </>
          );
      }
    };

    return (
      <div 
        id={`minu-svg-fallback-${pose}`}
        className={`${floatClass} ${className} relative flex flex-col items-center justify-center`}
        style={{ width: size, height: 'auto', aspectRatio: '1/1' }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-2xl select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="60%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
            <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="robeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
            </linearGradient>
            <filter id="magicGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Glow */}
          <circle cx="200" cy="200" r="140" fill="#34d399" opacity="0.1" filter="url(#magicGlow)" />

          {/* Left Horn */}
          <path d="M 120 150 C 90 90, 60 110, 40 140 C 20 170, 40 190, 60 180 C 80 170, 100 160, 120 175 Z" fill="url(#hornGrad)" stroke="#1e293b" strokeWidth="3" />
          {/* Right Horn */}
          <path d="M 280 150 C 310 90, 340 110, 360 140 C 380 170, 360 190, 340 180 C 320 170, 300 160, 280 175 Z" fill="url(#hornGrad)" stroke="#1e293b" strokeWidth="3" />

          {/* Little dangling numbers charm */}
          <text x="48" y="210" fontSize="22" fontWeight="bold" fontFamily="monospace" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1">3</text>
          <text x="352" y="210" fontSize="22" fontWeight="bold" fontFamily="monospace" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1">4</text>

          {/* Left Ear */}
          <path d="M 120 220 Q 50 240, 70 260 Q 120 260, 132 235" fill="url(#skinGrad)" stroke="#1e293b" strokeWidth="3" />
          {/* Right Ear */}
          <path d="M 280 220 Q 350 240, 330 260 Q 280 260, 268 235" fill="url(#skinGrad)" stroke="#1e293b" strokeWidth="3" />

          {/* Hoodie collar */}
          <path d="M 130 290 Q 200 310, 270 290 L 290 350 Q 200 375, 110 350 Z" fill="url(#robeGrad)" stroke="#78350f" strokeWidth="3.5" />

          {/* Head Shape */}
          <ellipse cx="200" cy="235" rx="92" ry="75" fill="url(#skinGrad)" stroke="#1e293b" strokeWidth="3.5" />

          {/* Dynamic Face parts based on pose */}
          {getMouthAndEyes()}

          {/* Blush */}
          <circle cx="138" cy="255" r="14" fill="#ef4444" opacity="0.3" />
          <circle cx="262" cy="255" r="14" fill="#ef4444" opacity="0.3" />

          {/* Hoodie Front decal */}
          <path d="M 152 301 C 152 301, 165 315, 200 315 C 235 315, 248 301, 248 301 Q 255 330, 200 340 Q 145 330, 152 301 Z" fill="#fcd34d" stroke="#78350f" strokeWidth="2.5" />
          <text x="200" y="333" fontSize="18" fontWeight="bold" fill="#78350f" textAnchor="middle">π</text>

          {/* Hands based on basic poses */}
          {pose === 'pointing' ? (
            <g className="animate-point origin-center">
              <path d="M 272 284 Q 315 284, 332 276 Q 345 264, 320 260 Q 295 260, 272 272 Z" fill="url(#skinGrad)" stroke="#1e293b" strokeWidth="3" />
              <circle cx="330" cy="268" r="11" fill="#a7f3d0" stroke="#1e293b" strokeWidth="2" />
              <path d="M 336 264 L 354 264" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : (
            <g className="animate-wave origin-bottom-left">
              <path d="M 125 292 C 110 320, 85 300, 75 280 C 65 260, 80 245, 95 260 Z" fill="url(#skinGrad)" stroke="#1e293b" strokeWidth="3" />
              <circle cx="75" cy="270" r="14" fill="#a7f3d0" stroke="#1e293b" strokeWidth="2.5" />
            </g>
          )}
        </svg>
        <div className="absolute -bottom-2 bg-emerald-400/20 w-28 h-3 rounded-full blur-sm"></div>
      </div>
    );
  }

  return (
    <div 
      id={`minu-image-container-${pose}`}
      className={`${floatClass} ${className} flex items-center justify-center`}
      style={{ width: size, height: 'auto', maxHeight: '100%' }}
    >
      <img
        src={imagePath}
        alt={`Minu character posing as ${pose}`}
        className="w-full h-auto max-h-[100%] transition-transform duration-300 pointer-events-none select-none object-contain"
        referrerPolicy="no-referrer"
        onError={() => {
          console.warn(`Could not render image Pose "${pose}" at "${imagePath}". Activating vector canvas backup.`);
          setHasError(true);
        }}
      />
    </div>
  );
}
