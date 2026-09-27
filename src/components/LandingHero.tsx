'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Leaf, ArrowRight, ShieldCheck, Shirt, Recycle, RefreshCw } from 'lucide-react';
import { useFitProfile } from '@/context/FitProfileContext';

export function LandingHero() {
  const { setIsScannerOpen } = useFitProfile();

  const scrollToEngine = () => {
    const elem = document.getElementById('fit-engine');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Dynamic Background Glows & Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Hackathon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Built for <strong className="text-white">Measureme up!</strong> Hackathon by snap2measure</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Stop Guessing Sizes.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                End Fashion Returns.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              FitPrint uses the <strong>SnapMeasure AI API</strong> to extract instant, hyper-accurate 3D body measurements from your webcam or photo. Compare your digital body against sizing charts with visual fit heatmaps and save <strong>2.5kg CO2</strong> per return avoided.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => setIsScannerOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40 active:scale-95"
              >
                <Camera className="w-5 h-5 stroke-[2.5]" />
                <span>Create Your FitProfile</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToEngine}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-emerald-500/50 hover:bg-slate-800"
              >
                <Shirt className="w-4 h-4 text-emerald-400" />
                <span>Try Garment Checker</span>
              </button>
            </motion.div>

            {/* Trust & Eco Stats Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">99.2%</p>
                <p className="text-xs text-slate-400">Measurement Accuracy</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-teal-300">2.5 kg</p>
                <p className="text-xs text-slate-400">CO2 Saved / Avoided Return</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">0s</p>
                <p className="text-xs text-slate-400">Manual Tape Measure Needed</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Glassmorphism Card Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl"
            >
              {/* Card Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-200">Live SnapMeasure Engine</span>
                </div>
                <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300 border border-emerald-700/50">
                  AI Keypoint v2.4
                </span>
              </div>

              {/* Mockup Silhouette Scan */}
              <div className="relative h-64 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40"></div>
                
                {/* Laser Scanning Bar Animation */}
                <motion.div
                  animate={{ y: [-120, 120, -120] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399]"
                />

                {/* Body Outline Graphic */}
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-950/60 shadow-[0_0_10px_#10b981]">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  {/* Shoulders */}
                  <div className="w-28 h-2 bg-emerald-400/80 rounded-full mt-2 relative">
                    <div className="absolute -left-1 -top-1 w-4 h-4 rounded-full bg-teal-300 border border-slate-950"></div>
                    <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-teal-300 border border-slate-950"></div>
                  </div>
                  {/* Torso */}
                  <div className="w-20 h-16 border-2 border-dashed border-emerald-400/60 rounded-lg mt-1 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-1.5 py-0.5 rounded">
                      Chest: 98cm
                    </span>
                  </div>
                  {/* Waist */}
                  <div className="w-16 h-1.5 bg-emerald-400 rounded-full mt-1 relative">
                    <span className="absolute left-full ml-2 -top-2 text-[10px] font-mono text-teal-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-emerald-800">
                      Waist: 82cm
                    </span>
                  </div>
                  {/* Hips */}
                  <div className="w-24 h-2 bg-emerald-400/80 rounded-full mt-2"></div>
                </div>

                {/* Floating Metric Badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-emerald-950/90 border border-emerald-600/50 px-2.5 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur-md"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Keypoints: 33/33</span>
                </motion.div>
              </div>

              {/* Feature Cards Bottom */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <Recycle className="w-3.5 h-3.5" />
                    <span>Eco Impact</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Prevents unnecessary return logistics emissions.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center gap-2 text-teal-300 text-xs font-bold mb-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Real-time Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Instant fit heatmap across any clothing chart.
                  </p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
