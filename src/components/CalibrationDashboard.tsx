/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grid3X3, 
  Palette, 
  Triangle, 
  Layers, 
  Scissors, 
  Lock, 
  Unlock, 
  Sparkles, 
  Glasses, 
  RotateCcw, 
  Award, 
  Info,
  ChevronLeft
} from 'lucide-react';
import MinuCharacter from './MinuCharacter';
import StageFlowModal from './StageFlowModal';

interface CalibrationDashboardProps {
  onBackToMenu: () => void;
}

export default function CalibrationDashboard({ onBackToMenu }: CalibrationDashboardProps) {
  // Game states we track
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [unlockedStages, setUnlockedStages] = useState<Record<string, boolean>>({
    pixels: true,
    colours: false,
    shapes: false,
    edges: false,
    segmentation: false
  });
  
  // Custom interactive tip system inside dashboard
  const [helperBubble, setHelperBubble] = useState<string>(
    "Hi! Tap the bouncy 'Pixels' capsule below so we can start calibrating my glasses!"
  );
  const [minuPose, setMinuPose] = useState<string>('pointing');

  const stagesData = [
    {
      id: 'pixels',
      title: '1. Pixels',
      description: 'The tiny square dots of light that form pictures!',
      concept: 'Raw Grids & Coordinates',
      subtext: 'Unlocks +20% Calibration',
      icon: Grid3X3,
      color: 'from-amber-400 to-yellow-500 text-slate-900',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.6)]',
      borderGlow: 'border-amber-400/60'
    },
    {
      id: 'colours',
      title: '2. Colours',
      description: 'Blending Red, Green, and Blue light together like paint!',
      concept: 'RGB Channels & Values',
      subtext: 'Unlocks +20% Calibration',
      icon: Palette,
      color: 'from-pink-400 to-rose-500 text-slate-900',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.4)]',
      borderGlow: 'border-pink-500/30'
    },
    {
      id: 'shapes',
      title: '3. Shapes',
      description: 'How computers combine points to trace outlines.',
      concept: 'Geomety & Object Detection',
      subtext: 'Unlocks +20% Calibration',
      icon: Triangle,
      color: 'from-cyan-400 to-blue-500 text-slate-900',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      borderGlow: 'border-cyan-500/30'
    },
    {
      id: 'edges',
      title: '4. Edges',
      description: 'Spotting borders where one thing ends and another starts!',
      concept: 'Gradient Shift Analysis',
      subtext: 'Unlocks +20% Calibration',
      icon: Scissors,
      color: 'from-emerald-400 to-teal-500 text-slate-900',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]',
      borderGlow: 'border-emerald-500/30'
    },
    {
      id: 'segmentation',
      title: '5. Segmentation',
      description: 'Coloring in separate objects so they stand out!',
      concept: 'AI Scene Understanding',
      subtext: 'Unlocks +20% Calibration',
      icon: Layers,
      color: 'from-violet-400 to-purple-500 text-slate-900',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]',
      borderGlow: 'border-violet-500/30'
    }
  ];

  const handleStageClick = (id: string) => {
    if (id === 'pixels') {
      setIsModalOpen(true);
      setHelperBubble("Yay! Let's check how the Pixels verification flows...");
      setMinuPose('holding_lens');
    } else {
      // Locked Stage Alert for kids
      setHelperBubble(
        `Oops! The "${id.charAt(0).toUpperCase() + id.slice(1)}" stage is still locked. We must complete the calibration tasks on Pixels first!`
      );
      setMinuPose('oops');
    }
  };

  const confirmPixelsStageFlow = () => {
    setIsModalOpen(false);
    
    // Trigger required standard browser alert as requested
    alert("Entering Stage Flow: Video -> Learn -> Play");

    // Advance the game dynamically to simulate calibrated state
    setProgress(20);
    setUnlockedStages({
      pixels: true,
      colours: true, // Unlock stage 2 Colours
      shapes: false,
      edges: false,
      segmentation: false
    });

    setHelperBubble(
      "Incredible! Pixels calibrated successfully! We are now at 20% completion, and the 'Colours' stage is now UNLOCKED! Let's continue!"
    );
    setMinuPose('celebrating');
  };

  const handleReset = () => {
    setProgress(0);
    setUnlockedStages({
      pixels: true,
      colours: false,
      shapes: false,
      edges: false,
      segmentation: false
    });
    setHelperBubble(
      "Observatory reset! Let's calibrate Minu's Glasses from 0% again!"
    );
    setMinuPose('afk_yawning');
  };

  const simulateMoreCalibration = () => {
    // Allows full exploration in preview mode
    if (progress < 100) {
      const nextProgress = progress + 20;
      setProgress(nextProgress);
      
      const updated = { ...unlockedStages };
      if (nextProgress >= 20) updated.colours = true;
      if (nextProgress >= 40) updated.shapes = true;
      if (nextProgress >= 60) updated.edges = true;
      if (nextProgress >= 80) updated.segmentation = true;
      setUnlockedStages(updated);
      
      setHelperBubble(`Magic simulation calibration increased to ${nextProgress}%!`);
      setMinuPose(nextProgress === 100 ? 'celebrating' : 'clapping');
    } else {
      setHelperBubble("Woohoo! We calibrated 100% of my glasses! You are an expert engineer! 🎉");
      setMinuPose('celebrating');
    }
  };

  return (
    <div 
      id="dashboard-screen"
      className="w-full h-full max-h-[calc(100vh-110px)] overflow-hidden mx-auto px-4 py-2 relative z-10 select-none flex flex-col justify-between"
    >
      {/* TOP HEADER CONTROLS & BACK BUTTON */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center justify-between">
          <button
            id="back-to-menu-btn"
            onClick={onBackToMenu}
            className="flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md border border-white/10"
          >
            <ChevronLeft className="w-4 h-4 text-yellow-300" />
            Main Menu
          </button>

          <div className="flex gap-2">
            <button
              id="simulate-btn"
              onClick={simulateMoreCalibration}
              className="px-3 py-1.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 hover:bg-blue-500/30 text-cyan-300 tracking-wide border border-blue-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              title="Unlock next level for demo purposes"
            >
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin-slow" />
              Demo Unlock (+20%)
            </button>

            <button
              id="reset-dashboard-btn"
              onClick={handleReset}
              className="p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-rose-300 hover:text-white transition-all cursor-pointer border border-red-500/30 flex items-center gap-1 text-[10px] font-bold px-3.5"
              title="Reset Calibration Progress"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* GLASSMORPHIC PROGRESS HEADER */}
        <div 
          id="progress-bar-container"
          className="glass-card p-3 md:p-3.5 rounded-2xl shadow-lg w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center shadow-md text-slate-950 shrink-0 border border-emerald-300/30">
                <Glasses className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-extrabold text-white tracking-wide flex items-center gap-2">
                  Magic Glasses Calibration
                  {progress === 100 && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 animate-bounce">
                      <Award className="w-3 h-3" /> Full Signal!
                    </span>
                  )}
                </h2>
                <p className="text-[11px] text-indigo-300 font-medium">Help Minu align coordinates, colors, & outline filters!</p>
              </div>
            </div>

            <div className="text-right flex md:flex-col items-baseline md:items-end justify-between md:justify-center">
              <span className="text-[10px] font-bold uppercase text-purple-200 md:block hidden">Calibration Progress</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                {progress}% <span className="text-sm text-indigo-300 font-normal">Calibrated</span>
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden relative border border-white/5">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-1000 shadow-[0_0_15px_rgba(52,211,153,0.65)] relative overflow-hidden"
              style={{ minWidth: progress > 0 ? '4%' : '0%' }}
            >
              {/* Animated overlay gradient stripes */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT (Tailored for kids) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center flex-grow py-1 overflow-hidden">
        
        {/* LEFT COLUMN: MINU POINTING GESTURE WITH helper bubble */}
        <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Magic Speech Bubble */}
          <div className="relative mb-2 w-full max-w-sm glass-card border-emerald-400/35 p-3 md:p-4 rounded-2xl rounded-bl-none shadow-md">
            {/* Bubble arrow pointing down/right */}
            <div className="absolute bottom-[-8px] left-[50%] md:left-[35%] -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-indigo-950/90"></div>
            <div className="absolute bottom-[-11px] left-[50%] md:left-[35%] -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-emerald-400/25 -z-10"></div>
            
            <p className="text-white text-xs md:text-sm font-semibold text-center md:text-left leading-normal flex gap-1.5 animate-pulse-slow">
              <span>📢</span>
              <span>"{helperBubble}"</span>
            </p>
          </div>

          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center relative select-none">
            {/* Glowing magical background aura */}
            <div className="absolute w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
            
            <MinuCharacter 
              pose={minuPose as any} 
              className="drop-shadow-[0_12px_25px_rgba(52,211,153,0.3)]" 
              size="95%"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: CALIBRATION STAGE PATH */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center relative pl-0 md:pl-2">
          
          {/* CONNECTING SPACE-PATH GLOW TUBE (Sleek design transparent dotted line) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent -z-10"></div>

          <div className="flex flex-col gap-2 relative z-10">
            {stagesData.map((stage, index) => {
              const isLocked = !unlockedStages[stage.id];
              const isBouncingPixels = stage.id === 'pixels' && !isLocked && progress === 0;
              const isJustUnlockedColours = stage.id === 'colours' && !isLocked && progress === 20;

              return (
                <motion.div
                  key={stage.id}
                  id={`stage-card-${stage.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                  className="relative group"
                >
                  {/* Bouncing notification light loop for interactive clicks */}
                  {isBouncingPixels && (
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 rounded-2xl blur opacity-75 animate-pulse z-0 pointer-events-none"></div>
                  )}

                  {isJustUnlockedColours && (
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-rose-600 rounded-2xl blur opacity-75 animate-pulse z-0 pointer-events-none"></div>
                  )}

                  {/* Stage capsule button - Sleek interface styles */}
                  <div
                    onClick={() => handleStageClick(stage.id)}
                    className={`
                      w-full p-2.5 px-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer relative z-10
                      ${isLocked 
                        ? 'opacity-40 bg-white/5 border-white/10 text-white/50 cursor-not-allowed hover:opacity-50' 
                        : `glass-card border-white/20 shadow-md hover:bg-white/15 hover:scale-[1.01] active:scale-[0.99] ${stage.glow}`
                      }
                      ${isBouncingPixels ? 'animate-pulse-glow border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : ''}
                      ${isJustUnlockedColours ? 'scale-[1.015] border-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Interactive Stage Badge Graphic */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md relative overflow-hidden transition-all shrink-0
                        ${isLocked 
                          ? 'bg-white/10 text-white/40' 
                          : `bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-extrabold`
                        }
                      `}>
                        <span className="text-sm font-black">{index + 1}</span>
                      </div>

                      {/* Stage description text */}
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <h3 className={`text-sm md:text-base font-extrabold tracking-wide ${isLocked ? 'text-slate-400' : 'text-white'}`}>
                            {stage.title}
                          </h3>
                          {stage.id === 'pixels' && !isLocked && progress === 0 && (
                            <span className="text-[9px] font-bold tracking-widest uppercase bg-emerald-400 text-slate-950 px-1.5 py-0.5 rounded-full animate-pulse">
                              Start!
                            </span>
                          )}
                          {stage.id === 'colours' && !isLocked && progress === 20 && (
                            <span className="text-[9px] font-bold tracking-widest uppercase bg-pink-500 text-white px-1.5 py-0.5 rounded-full animate-bounce">
                              New!
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] md:text-xs mt-0.5 leading-snug max-w-sm md:max-w-md ${isLocked ? 'text-slate-500' : 'text-indigo-200'}`}>
                          {stage.description}
                        </p>
                        {!isLocked && (
                          <div className="text-[9px] font-bold mt-0.5 text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded-md inline-block">
                            🔬 Concept: {stage.concept}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* LOCK STATE BADGE OR GO ARROW */}
                    <div className="flex items-center justify-center p-1 rounded-full shrink-0">
                      {isLocked ? (
                        <div className="bg-slate-900/80 p-2 rounded-xl text-slate-500 border border-slate-700">
                          <Lock className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl border border-emerald-400/30 bg-slate-950/40 text-emerald-300 hover:text-emerald-200 transition-colors">
                          <Unlock className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER ADVICE FOR KIDS */}
      <div className="mt-2 p-2 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-center gap-2 justify-center text-center shrink-0">
        <Info className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
        <span className="text-[11px] text-indigo-200 font-medium select-none">
          Click stage bases to align wavelengths. We need all calibration levels to reach 100%!
        </span>
      </div>

      {/* PORTAL TO STAGE FLOW POPUP / POPUP REPLACEMENT */}
      <StageFlowModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setHelperBubble("No worries, let's play when you are ready! ❤️");
        }}
        onConfirm={confirmPixelsStageFlow}
        stageTitle="Pixels"
        stageConcept="Grids and Coordinates"
      />
    </div>
  );
}
