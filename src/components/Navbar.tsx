'use client';

import React from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { BarChart3, Camera, Ruler, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const { setIsScannerOpen, unit, toggleUnit, hasCustomProfile, measurements } = useFitProfile();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          className="flex cursor-pointer items-center gap-3 text-left"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
            <Ruler className="h-5 w-5 text-slate-950 stroke-[2.5]" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -right-1 -top-1 flex h-3 w-3"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
            </motion.span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Fit<span className="text-emerald-400">Print</span>
              </span>
              <span className="hidden rounded-full border border-emerald-700/50 bg-emerald-950/90 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 sm:inline">
                Fit intelligence
              </span>
            </div>
            <p className="hidden text-[10px] font-medium text-emerald-400/80 sm:block">Clearer fit decisions for apparel</p>
          </div>
        </button>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex">
          <button onClick={() => scrollToSection('how-it-works')} className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            How it works
          </button>
          <button onClick={() => scrollToSection('pilot')} className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
            <BarChart3 className="h-4 w-4 text-teal-300" />
            Pilot
          </button>
          <button onClick={() => scrollToSection('fit-engine')} className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
            <Ruler className="h-4 w-4 text-cyan-300" />
            Demo
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleUnit}
            className="hidden items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-emerald-500/50 hover:bg-slate-800 sm:flex"
            title="Toggle between metric (cm) and imperial (in)"
          >
            <span className={unit === 'metric' ? 'font-bold text-emerald-400' : 'text-slate-400'}>cm</span>
            <span className="text-slate-600">/</span>
            <span className={unit === 'imperial' ? 'font-bold text-emerald-400' : 'text-slate-400'}>in</span>
          </button>

          {hasCustomProfile && (
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-300 lg:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{measurements.chest}cm Chest</span>
            </div>
          )}

          <button
            onClick={() => setIsScannerOpen(true)}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40 active:scale-95 sm:px-4"
          >
            <Camera className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">{hasCustomProfile ? 'Re-scan body' : 'Try the demo'}</span>
            <span className="sm:hidden">Try demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
