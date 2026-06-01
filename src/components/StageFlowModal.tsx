/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Trophy, Sparkles, X, ArrowRight, Video, CheckCircle } from 'lucide-react';

interface StageFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  stageTitle: string;
  stageConcept: string;
}

export default function StageFlowModal({ isOpen, onClose, onConfirm, stageTitle, stageConcept }: StageFlowModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="magic-stage-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg"
      >
        {/* Modal Backdrop animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative max-w-2xl w-full text-white overflow-hidden rounded-3xl border-3 border-amber-400 shadow-[0_20px_50px_rgba(251,191,36,0.3)] bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 p-6 md:p-8"
        >
          {/* Sparkly corner background effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block p-2 px-4 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-400/30">
              🛸 Level 1 Calibration 🛸
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-spin-slow" />
              {stageTitle} Stage Flow
            </h2>
            <p className="text-indigo-200 text-sm md:text-base mt-2 max-w-lg mx-auto font-medium">
              We need to adjust Minu's lenses to decode: <span className="text-emerald-300 font-bold underline">{stageConcept}</span>
            </p>
          </div>

          {/* Winding 3-Step Kid Flow representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 relative">
            {/* Step 1: Video */}
            <div className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-3 ring-4 ring-indigo-500/10">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 1</span>
              <h3 className="font-bold text-lg text-white mt-1">Watch & Learn</h3>
              <p className="text-xs text-indigo-200 mt-2">
                Watch a cartoon movie explaining how Minu's sensor glasses collect pixel grids.
              </p>
              
              {/* Connector Arrow (Desktop only) */}
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-amber-300">
                <ArrowRight className="w-5 h-5 animate-point" />
              </div>
            </div>

            {/* Step 2: Learn */}
            <div className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3 ring-4 ring-emerald-500/10">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 2</span>
              <h3 className="font-bold text-lg text-emerald-300 mt-1">Interactions</h3>
              <p className="text-xs text-indigo-200 mt-2">
                Click dots on a magical screen to turn numbers into beautiful picture details.
              </p>
              
              {/* Connector Arrow (Desktop only) */}
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10 text-amber-300">
                <ArrowRight className="w-5 h-5 animate-point" />
              </div>
            </div>

            {/* Step 3: Play */}
            <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center mb-3 ring-4 ring-pink-500/10">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Step 3</span>
              <h3 className="font-bold text-lg text-pink-300 mt-1">Play & Win</h3>
              <p className="text-xs text-indigo-200 mt-2">
                Match grid items under the countdown to lock in raw calibration and save!
              </p>
            </div>
          </div>

          {/* Instructional Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800 text-center mb-6">
            <p className="text-sm font-semibold text-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Kids Friendly Stage Flow: Video ➔ Learn ➔ Play
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              id="confirm-flow-btn"
              onClick={onConfirm}
              className="w-full sm:w-auto py-4 px-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 font-extrabold text-lg uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer border-b-4 border-teal-700 hover:brightness-105"
            >
              🚀 Let's Start Flow!
            </button>
            <button
              id="cancel-flow-btn"
              onClick={onClose}
              className="w-full sm:w-auto py-4 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-indigo-200 hover:text-white font-bold transition-all cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
