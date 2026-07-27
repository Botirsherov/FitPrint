'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

interface ScanningAnimationProps {
  imagePreview: string | null;
  onComplete?: () => void;
}

const STEPS = [
  'Initializing SnapMeasure AI Engine...',
  'Detecting Pose Keypoints (BlazePose 33 landmarks)...',
  'Mapping Anatomical Girths & Contours...',
  'Calculating Chest, Waist, Hips & Inseam...',
  'Finalizing Digital FitProfile...',
];

export function ScanningAnimation({ imagePreview, onComplete }: ScanningAnimationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const step = Math.min(Math.floor((progress / 100) * STEPS.length), STEPS.length - 1);
    setCurrentStepIndex(step);
  }, [progress]);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 space-y-6">
      
      {/* Container Box */}
      <div className="relative w-full max-w-sm h-80 rounded-2xl bg-slate-950 border border-emerald-500/40 overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Background Image Preview if uploaded or default silhouette */}
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Scan Subject"
            className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-90"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
            {/* Fallback Anatomical Vector */}
            <div className="w-24 h-56 border-2 border-dashed border-emerald-500/30 rounded-full flex flex-col items-center justify-around py-4">
              <div className="w-8 h-8 rounded-full border border-emerald-400 bg-emerald-950/60"></div>
              <div className="w-16 h-1 bg-emerald-400"></div>
              <div className="w-12 h-1 bg-teal-400"></div>
              <div className="w-14 h-1 bg-emerald-400"></div>
            </div>
          </div>
        )}

        {/* Cyberpunk Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>

        {/* Laser Scanner Bar */}
        <motion.div
          animate={{ y: [-150, 150, -150] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981]"
        />

        {/* Keypoint Detection Nodes */}
        <div className="absolute inset-0 flex flex-col items-center justify-around py-8 pointer-events-none">
          {/* Shoulder keypoints */}
          <div className="w-48 flex justify-between px-4">
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></motion.div>
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></motion.div>
          </div>

          {/* Chest Keypoint line */}
          <div className="w-40 border-t border-dashed border-teal-300 relative flex items-center justify-center">
            <span className="text-[10px] font-mono text-teal-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-teal-600/50">
              CHEST LINE
            </span>
          </div>

          {/* Waist Keypoint line */}
          <div className="w-36 border-t border-dashed border-emerald-400 relative flex items-center justify-center">
            <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-emerald-600/50">
              WAIST LINE
            </span>
          </div>

          {/* Hip keypoints */}
          <div className="w-44 flex justify-between px-6">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"></motion.div>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.6 }} className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"></motion.div>
          </div>
        </div>

        {/* Progress Percentage Chip */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-slate-950/90 border border-emerald-500/50 px-3 py-1 text-xs font-mono font-bold text-emerald-300 backdrop-blur-md flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
          <span>{progress}%</span>
        </div>
      </div>

      {/* Progress Bar & Status Text */}
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {STEPS[currentStepIndex]}
          </span>
          <span className="text-slate-400 font-mono">{progress}/100</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

    </div>
  );
}
