/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Music, Volume2, VolumeX, Info, Star } from 'lucide-react';
import SplashMenu from './components/SplashMenu';
import CalibrationDashboard from './components/CalibrationDashboard';

// Generate some random positions for background galaxy stars
interface CelestialStar {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
}

export default function App() {
  const [screen, setScreen] = useState<'SPLASH' | 'DASHBOARD'>('SPLASH');
  const [stars, setStars] = useState<CelestialStar[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Generate beautiful galaxy backdrops once on mount
  useEffect(() => {
    const generatedStars: CelestialStar[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1.5}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div 
      id="observatory-layout"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900"
    >
      {/* 1. LAYER - MAGICAL COSMIC CELESTIAL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Stellar light glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-10 w-[20vw] h-[20vw] rounded-full bg-emerald-500/5 blur-[100px] animate-pulse"></div>

        {/* Twinkling star field */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-star-twinkle shadow-[0_0_5px_white]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}

        {/* Space dust particles floating */}
        <div className="absolute top-20 left-10 text-yellow-300/35 text-xl animate-float">✨</div>
        <div className="absolute bottom-40 right-20 text-pink-400/25 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>☄️</div>
        <div className="absolute top-1/3 right-1/3 text-emerald-300/20 text-lg animate-float" style={{ animationDelay: '2s' }}>🛸</div>
      </div>

      {/* 2. HEADER BAR HUD CONTROL panel (Persistent across views) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          {/* Pulsing Magic Glasses Mini Emblem */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 flex items-center justify-center text-slate-900 shadow-lg border border-amber-300 animate-pulse">
            <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-yellow-300 font-extrabold flex items-center gap-1">
              Kids CV Lab <span className="animate-ping w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            </div>
            <div className="text-sm font-bold text-slate-300">Phase 1 Calibration Dashboard</div>
          </div>
        </div>

        {/* Audio helper control panel for kids */}
        <div className="flex items-center gap-3">
          <button
            id="sound-toggle-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-3 rounded-full border transition-all cursor-pointer shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider
              ${soundEnabled 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30' 
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
              }
            `}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span className="hidden sm:inline">Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Sound: OFF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 3. MAIN INTERACTIVE CAMPUS CONTAINER */}
      <main className="flex-grow flex items-center justify-center w-full relative z-10 py-4">
        <AnimatePresence mode="wait">
          {screen === 'SPLASH' ? (
            <motion.div
              key="splash"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <SplashMenu onStart={() => {
                if (soundEnabled) {
                  try {
                    // Kids playful chime simulation
                    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContextClass) {
                      const synth = new AudioContextClass();
                      const osc = synth.createOscillator();
                      const gain = synth.createGain();
                      osc.connect(gain);
                      gain.connect(synth.destination);
                      osc.type = 'sine';
                      osc.frequency.setValueAtTime(440, synth.currentTime); // A4
                      osc.frequency.exponentialRampToValueAtTime(880, synth.currentTime + 0.3); // A5
                      gain.gain.setValueAtTime(0.1, synth.currentTime);
                      gain.gain.exponentialRampToValueAtTime(0.01, synth.currentTime + 0.4);
                      osc.start();
                      osc.stop(synth.currentTime + 0.4);
                    }
                  } catch (audioErr) {
                    console.warn("AudioContext block prevented splash sound:", audioErr);
                  }
                }
                setScreen('DASHBOARD');
              }} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <CalibrationDashboard onBackToMenu={() => {
                if (soundEnabled) {
                  try {
                    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContextClass) {
                      const synth = new AudioContextClass();
                      const osc = synth.createOscillator();
                      const gain = synth.createGain();
                      osc.connect(gain);
                      gain.connect(synth.destination);
                      osc.frequency.setValueAtTime(554.37, synth.currentTime); // C#5
                      osc.frequency.exponentialRampToValueAtTime(277.18, synth.currentTime + 0.35); // C#4
                      gain.gain.setValueAtTime(0.08, synth.currentTime);
                      gain.gain.exponentialRampToValueAtTime(0.01, synth.currentTime + 0.4);
                      osc.start();
                      osc.stop(synth.currentTime + 0.4);
                    }
                  } catch (audioErr) {
                    console.warn("AudioContext block prevented dashboard sound:", audioErr);
                  }
                }
                setScreen('SPLASH');
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. FOOTER INFO */}
      <footer className="relative z-10 w-full text-center py-4 bg-slate-950/20 backdrop-blur-sm border-t border-white/5">
        <p className="text-xs text-indigo-300 font-semibold select-none flex items-center justify-center gap-1.5">
          <span>🛡️</span> Game Phase 1 Portal • Engineered for Kid Explorers • Minu is ready to calibrate!
        </p>
      </footer>
    </div>
  );
}
