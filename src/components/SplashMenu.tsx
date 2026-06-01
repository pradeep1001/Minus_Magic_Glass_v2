/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, SkipForward } from 'lucide-react';
import MinuCharacter from './MinuCharacter';

interface SplashMenuProps {
  onStart: () => void;
}

type UfoPhase = 'APPROACH' | 'BEAMING' | 'REVEAL' | 'DEPARTURE' | 'READY';

export default function SplashMenu({ onStart }: SplashMenuProps) {
  const [phase, setPhase] = useState<UfoPhase>('APPROACH');
  const [beamIntensity, setBeamIntensity] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound generator helper for kid-friendly cosmic science vibes
  const playBeep = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may be blocked by browser policy
    }
  };

  useEffect(() => {
    // Step-by-step landing sequence timer
    if (phase === 'APPROACH') {
      const approachSound = setInterval(() => {
        playBeep(260 + Math.random() * 80, 0.15, 'triangle');
      }, 350);

      const timer = setTimeout(() => {
        clearInterval(approachSound);
        setPhase('BEAMING');
        playBeep(523.25, 0.4, 'sine'); // C5 chime
      }, 1600);
      return () => {
        clearInterval(approachSound);
        clearTimeout(timer);
      };
    }

    if (phase === 'BEAMING') {
      // Gradually light up beam
      let intensity = 0;
      const interval = setInterval(() => {
        intensity = Math.min(1, intensity + 0.15);
        setBeamIntensity(intensity);
        playBeep(440 + intensity * 200, 0.08, 'sawtooth');
      }, 80);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setPhase('REVEAL');
        playBeep(880, 0.6, 'sine'); // Energized magic tone
      }, 1400);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }

    if (phase === 'REVEAL') {
      const timer = setTimeout(() => {
        setPhase('DEPARTURE');
        playBeep(330, 0.4, 'sine');
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === 'DEPARTURE') {
      let intensity = 1;
      const interval = setInterval(() => {
        intensity = Math.max(0, intensity - 0.2);
        setBeamIntensity(intensity);
      }, 100);

      const timer = setTimeout(() => {
        clearInterval(interval);
        setPhase('READY');
        playBeep(587.33, 0.5, 'sine'); // Relaxed bright D5
      }, 1000);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [phase]);

  // Instantly finish landing animation sequence if kid/parents get impatient
  const handleSkipIntro = () => {
    setPhase('READY');
    setBeamIntensity(0);
    playBeep(659.25, 0.3); // E5
  };

  return (
    <div 
      id="splash-screen"
      style={{ minHeight: '520px' }}
      className="flex flex-col items-center justify-between h-[calc(100vh-140px)] w-full text-center px-4 relative z-10 select-none overflow-hidden"
    >
      {/* SKIP INTRO FLOATING HUD ACTION */}
      {phase !== 'READY' && (
        <button
          id="skip-intro-btn"
          onClick={handleSkipIntro}
          className="absolute top-1 right-2 z-40 bg-slate-900/45 hover:bg-slate-900/75 border border-white/20 rounded-full px-3 py-1 text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <span>Skip Space Intro</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      )}

      {/* HEADER SECTION - COMPACT AND HIGH IMPACT */}
      <div className="max-w-4xl w-full flex flex-col items-center justify-center flex-1 py-1 relative">
        <motion.div
          id="app-title-group"
          layout
          className="relative mb-2 md:mb-4 text-center z-30"
        >
          {/* Pulsing stars */}
          <div className="absolute -top-7 -left-7 text-yellow-300 animate-pulse">
            <Sparkles className="w-6 h-6 fill-yellow-300/30" />
          </div>
          <div className="absolute -bottom-1 -right-6 text-pink-400 animate-bounce">
            <Sparkles className="w-5 h-5" />
          </div>

          <h1 
            id="app-title-h1"
            className="text-4xl md:text-5xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-emerald-300 to-amber-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] tracking-tight px-2"
          >
            Minu's Magic Glasses
          </h1>
          <p className="text-purple-300 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">
            🚀 Kids Computer Vision Calibration Lab Station 🛸
          </p>
        </motion.div>

        {/* INTEGRATED LANDING FIELD CONTAINER */}
        <div className="relative w-full max-w-md h-64 md:h-72 flex flex-col items-center justify-start pointer-events-none mb-1.5">
          
          {/* THE BEAM OF PLASMA LIGHT - custom Trapezoid style beam */}
          <AnimatePresence>
            {(phase === 'BEAMING' || phase === 'REVEAL' || phase === 'DEPARTURE') && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: beamIntensity, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: 'top center' }}
                className="absolute top-[52px] bottom-1 w-64 z-10 flex flex-col items-center justify-end"
              >
                {/* TRAPEZOID SVG BEAM */}
                <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#34d399" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="beamGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Trapezoid Path: Top base width 70, Bottom base width 200 */}
                  <path 
                    d="M 65 0 L 135 0 L 200 300 L 0 300 Z" 
                    fill="url(#beamGrad)" 
                    filter="url(#beamGlow)" 
                  />
                  
                  {/* Glowing vertical particle streams inside trapezium */}
                  <line x1="100" y1="0" x2="100" y2="280" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="6,12" opacity="0.65" className="animate-pulse" />
                  <line x1="82" y1="0" x2="40" y2="280" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="5,10" opacity="0.4" />
                  <line x1="118" y1="0" x2="160" y2="280" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="5,10" opacity="0.4" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE FLYING UFO SPACESHIP */}
          <motion.div
            id="ufo-spaceship-craft"
            className="absolute z-40 top-0"
            animate={
              phase === 'APPROACH' 
                ? { y: [-150, 0, -10, 0], x: [100, -20, 10, 0], scale: [0.3, 1.1, 1], rotate: [20, -10, 5, 0] }
                : phase === 'BEAMING' 
                ? { y: [0, -4, 4, 0], rotate: [-1, 1, -1, 0] }
                : phase === 'REVEAL'
                ? { y: -5 }
                : phase === 'DEPARTURE'
                ? { y: [0, -130], scale: [1, 0.55], opacity: [1, 0.9] }
                : { y: -110, x: 120, scale: 0.55, opacity: 0.85 } // Floating gently in top right when ready
            }
            transition={
              phase === 'APPROACH' || phase === 'BEAMING'
                ? { type: 'tween', ease: 'easeInOut', duration: phase === 'APPROACH' ? 1.6 : 1.2 }
                : { type: 'spring', stiffness: 85, damping: 14, duration: 1 }
            }
          >
            {/* UFO VECTOR DRAWING */}
            <svg viewBox="0 0 200 120" className="w-36 h-28 drop-shadow-[0_8px_16px_rgba(34,197,94,0.35)]">
              {/* Glass Cockpit Dome */}
              <ellipse cx="100" cy="45" rx="36" ry="24" fill="#67e8f9" opacity="0.8" stroke="#ffffff" strokeWidth="2" />
              {/* Green Alien Pilot Silhouette nodding or sitting */}
              <circle cx="100" cy="42" r="12" fill="#22c55e" />
              <ellipse cx="100" cy="56" rx="14" ry="8" fill="#15803d" />
              <ellipse cx="96" cy="39" rx="2" ry="3" fill="#ffffff" />
              <ellipse cx="104" cy="39" rx="2" ry="3" fill="#ffffff" />
              
              {/* Beam Emitting Base */}
              <ellipse cx="100" cy="74" rx="28" ry="10" fill="#fde047" stroke="#eab308" strokeWidth="1" />
              
              {/* Metallic Starship Disk Ring */}
              <ellipse cx="100" cy="65" rx="72" ry="18" fill="url(#ufoMetallic)" stroke="#94a3b8" strokeWidth="3" />
              
              {/* Blinking Peripheral Navigation Light Orbs */}
              <g>
                <circle cx="42" cy="65" r="4" fill="#ef4444" className="animate-pulse" />
                <circle cx="65" cy="73" r="4.5" fill="#eab308" className="animate-ping" style={{ animationDuration: '0.8s' }} />
                <circle cx="100" cy="76" r="5" fill="#22c55e" className="animate-pulse" />
                <circle cx="135" cy="73" r="4.5" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '0.9s' }} />
                <circle cx="158" cy="65" r="4" fill="#a855f7" className="animate-pulse" />
              </g>

              {/* Laser Projector Lens */}
              <polygon points="90,75 110,75 100,85" fill="#22d3ee" className="animate-pulse" />

              <defs>
                <linearGradient id="ufoMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="25%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="75%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* MINU EMITTING STATUS OR REVEAL - Descends from beneath the UFO */}
          <div className="absolute top-[48px] h-[220px] w-full flex items-center justify-center pointer-events-none z-20">
            <AnimatePresence>
              {(phase === 'REVEAL' || phase === 'DEPARTURE' || phase === 'READY') && (
                <motion.div
                  initial={{ scale: 0.1, opacity: 0, y: -70 }}
                  animate={{ scale: 1.25, opacity: 1, y: 15 }}
                  exit={{ scale: 0.1, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 95, damping: 13, delay: 0.05 }}
                  className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 relative flex items-center justify-center"
                >
                  <MinuCharacter 
                    pose="waving" 
                    className="drop-shadow-[0_12px_25px_rgba(34,197,94,0.4)]"
                    size="100%"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* DYNAMIC SPEECH BUBBLE & MISSION STATEMENT (Positioned relatively to NEVER overlap Minu) */}
        <div className="w-full max-w-sm mx-auto mt-2 min-h-[95px] flex items-center justify-center relative z-30">
          <AnimatePresence mode="wait">
            {phase === 'APPROACH' && (
              <motion.span
                key="approach"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-950/85 border border-indigo-400/35 text-indigo-400 text-xs font-black tracking-wider py-1.5 px-4 rounded-full backdrop-blur-md inline-block shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                🛸 Spaceship Approaching Orbit...
              </motion.span>
            )}
            {phase === 'BEAMING' && (
              <motion.span
                key="beaming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-cyan-950/85 border border-cyan-400/50 text-cyan-300 text-xs font-black tracking-wider py-1.5 px-4 rounded-full backdrop-blur-md inline-block shadow-[0_4px_12px_rgba(0,0,0,0.4)] animate-pulse"
              >
                ⚡ Charging Particle Beam Transmitter...
              </motion.span>
            )}
            {phase === 'REVEAL' && (
              <motion.span
                key="reveal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-950/85 border border-emerald-400/50 text-emerald-300 text-xs font-black tracking-wider py-1.5 px-4 rounded-full backdrop-blur-md inline-block shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                🪐 Scanning Wavelengths: Beaming Minu!
              </motion.span>
            )}
            {phase === 'DEPARTURE' && (
              <motion.span
                key="departure"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-purple-950/85 border border-purple-400/35 text-purple-200 text-xs font-black tracking-wider py-1.5 px-4 rounded-full backdrop-blur-md inline-block shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                🛰️ Safe Landing! Parking spaceship...
              </motion.span>
            )}
            {phase === 'READY' && (
              <motion.div
                key="ready"
                initial={{ scale: 0.8, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative glass-card border-cyan-400/35 p-3.5 rounded-2xl shadow-xl max-w-sm text-left border-l-4 border-l-cyan-400"
              >
                {/* Little dialog voice icon header */}
                <div className="absolute -top-3.5 left-6 bg-cyan-400 text-indigo-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full select-none shadow-md">
                  Minu Asks For Help
                </div>
                <p className="text-white text-xs md:text-sm font-semibold leading-relaxed pt-1">
                  <span className="text-base mr-1">💬</span>
                  "Waaaah! It says Earth has beautiful flowers and green forests, but my glasses are out of focus! Will you help me calibrate them?"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MASSIVE PULSING TACTILE PLAY BUTTON */}
        <div className="relative w-full max-w-xs h-16 flex items-center justify-center mt-3 z-30">
          <AnimatePresence>
            {phase === 'READY' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className="w-full"
              >
                <button
                  id="start-calibration-btn"
                  onClick={onStart}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white text-lg md:text-xl font-extrabold tracking-wider uppercase border-b-4 border-indigo-900 shadow-[0_6px_20px_rgba(139,92,246,0.45)] transition-all hover:scale-[1.03] active:scale-95 active:border-b-2 active:translate-y-0.5 hover:brightness-110 flex items-center justify-center gap-2.5 cursor-pointer select-none"
                >
                  <Play className="w-5 h-5 fill-white text-white stroke-2" />
                  Start Calibration
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* IMMERSIVE LANDSCAPE NATURE SCENERY (Beautiful forests & blooming flowers) */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none select-none z-0 overflow-hidden opacity-85">
        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="hill2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <linearGradient id="trunk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* Hill 1 (Back hill) */}
          <path d="M 0 160 Q 200 100, 450 140 T 800 120 L 800 200 L 0 200 Z" fill="url(#hill1)" />

          {/* Back Forest Pines */}
          <g opacity="0.8">
            <rect x="80" y="115" width="6" height="20" fill="url(#trunk)" />
            <polygon points="65,115 101,115 83,80" fill="#047857" />
            <polygon points="70,95 96,95 83,65" fill="#059669" />

            <rect x="710" y="110" width="6" height="20" fill="url(#trunk)" />
            <polygon points="695,110 731,110 713,75" fill="#047857" />
            <polygon points="700,90 726,90 713,60" fill="#059669" />
          </g>

          {/* Hill 2 (Front hill with rich green layout) */}
          <path d="M 0 180 Q 300 110, 550 160 T 800 150 L 800 200 L 0 200 Z" fill="url(#hill2)" />

          {/* Front Nature Bushes & Round Oak Trees */}
          <g>
            <rect x="160" y="130" width="8" height="24" fill="url(#trunk)" />
            <circle cx="164" cy="115" r="22" fill="#10b981" />
            <circle cx="174" cy="108" r="16" fill="#34d399" />
            <circle cx="152" cy="110" r="14" fill="#059669" />

            <rect x="620" y="145" width="8" height="25" fill="url(#trunk)" />
            <circle cx="624" cy="130" r="24" fill="#10b981" />
            <circle cx="636" cy="122" r="18" fill="#34d399" />
            <circle cx="612" cy="125" r="15" fill="#059669" />
          </g>

          {/* POPPING COLORFUL FLOWERS (With active swaying sway transitions) */}
          <g id="popping-flowers">
            {/* Yellow Flower Left */}
            <g transform="translate(110, 165)" className="animate-sway origin-bottom">
              <path d="M 0 0 Q -3 -15, -4 -30" fill="none" stroke="#047857" strokeWidth="2.5" />
              <circle cx="-12" cy="-30" r="6" fill="#fef08a" />
              <circle cx="4" cy="-30" r="6" fill="#fef08a" />
              <circle cx="-4" cy="-38" r="6" fill="#fef08a" />
              <circle cx="-4" cy="-22" r="6" fill="#fef08a" />
              <circle cx="-4" cy="-30" r="5" fill="#f59e0b" />
            </g>

            {/* Red Tulip Left */}
            <g transform="translate(220, 175)" className="animate-sway origin-bottom" style={{ animationDelay: '0.4s' }}>
              <path d="M 0 0 Q 3 -10, 5 -24" fill="none" stroke="#047857" strokeWidth="2.5" />
              <path d="M 0 -24 Q 5 -36, 10 -24 Q 10 -32, 5 -32 Q 0 -32, 0 -24" fill="#ef4444" />
              <path d="M 1 -24 C -3 -32, 13 -32, 9 -24 Z" fill="#b91c1c" />
            </g>

            {/* Pink Wildflower Center-Left */}
            <g transform="translate(280, 182)" className="animate-sway origin-bottom" style={{ animationDelay: '0.8s' }}>
              <path d="M 0 0 Q -2 -8, -1 -20" fill="none" stroke="#047857" strokeWidth="2" />
              <circle cx="-6" cy="-20" r="4.5" fill="#f472b6" />
              <circle cx="4" cy="-20" r="4.5" fill="#f472b6" />
              <circle cx="-1" cy="-26" r="4.5" fill="#f472b6" />
              <circle cx="-1" cy="-14" r="4.5" fill="#f472b6" />
              <circle cx="-1" cy="-20" r="4" fill="#fdf2f8" />
            </g>

            {/* Yellow Daisy Right */}
            <g transform="translate(560, 185)" className="animate-sway origin-bottom" style={{ animationDelay: '0.2s' }}>
              <path d="M 0 0 Q 2 -12, 3 -25" fill="none" stroke="#047857" strokeWidth="2" />
              <circle cx="-3" cy="-25" r="5" fill="#fde047" />
              <circle cx="9" cy="-25" r="5" fill="#fde047" />
              <circle cx="3" cy="-31" r="5" fill="#fde047" />
              <circle cx="3" cy="-19" r="5" fill="#fde047" />
              <circle cx="3" cy="-25" r="4.5" fill="#ca8a04" />
            </g>

            {/* Purple Tulip Right */}
            <g transform="translate(680, 170)" className="animate-sway origin-bottom" style={{ animationDelay: '0.6s' }}>
              <path d="M 0 0 Q -3 -15, -5 -28" fill="none" stroke="#047857" strokeWidth="2.5" />
              <path d="M -10 -28 Q -5 -40, 0 -28 Q 0 -36, -5 -36 Q -10 -36, -10 -28" fill="#bc89e6" />
              <path d="M -9 -28 C -13 -36, 3 -36, -1 -28 Z" fill="#7c3aed" />
            </g>
          </g>
        </svg>
      </div>

      {/* THREE HIGH IMPACT CARDS AT BOTTOM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl w-full mt-2 shrink-0 z-30">
        <div className="glass-card rounded-xl p-2 px-3 text-center shadow-md relative flex flex-col justify-center">
          <h3 className="text-emerald-300 font-bold text-xs flex items-center justify-center gap-1">
            <span>🔬</span> Concept 1: Pixels
          </h3>
          <p className="text-[10px] text-indigo-200 mt-0.5">Interact with RGB light grids and coordinates!</p>
        </div>
        <div className="glass-card rounded-xl p-2 px-3 text-center shadow-md relative flex flex-col justify-center animate-pulse-slow">
          <h3 className="text-amber-300 font-bold text-xs flex items-center justify-center gap-1">
            <span>🎨</span> Concept 2: Colors
          </h3>
          <p className="text-[10px] text-indigo-200 mt-0.5">Filter the wavelengths to solve puzzles.</p>
        </div>
        <div className="glass-card rounded-xl p-2 px-3 text-center shadow-md relative flex flex-col justify-center">
          <h3 className="text-pink-300 font-bold text-xs flex items-center justify-center gap-1">
            <span>📐</span> Concept 3: Shapes & Edges
          </h3>
          <p className="text-[10px] text-indigo-200 mt-0.5">Identify edge filters just like artificial minds do.</p>
        </div>
      </div>
    </div>
  );
}

