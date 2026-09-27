'use client';

import React from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { Sparkles, Camera, Leaf, Ruler, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const { setIsScannerOpen, unit, toggleUnit, hasCustomProfile, measurements } = useFitProfile();

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/40 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
            <Ruler className="h-5 w-5 text-slate-950 stroke-[2.5]" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -top-1 -right-1 flex h-3 w-3"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
            </motion.span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                Fit<span className="text-emerald-400">Print</span>
              </span>
              <span className="rounded-full bg-emerald-950/90 border border-emerald-700/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                SnapMeasure AI
              </span>
            </div>
            <p className="text-[10px] font-medium text-emerald-400/80 hidden sm:block">
              Zero-Return AI Fit & Eco Engine
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('fit-engine')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Fit Comparison
          </button>
          <button
            onClick={() => scrollToSection('body-profile')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Ruler className="w-4 h-4 text-teal-400" />
            Body Profile
          </button>
          <button
            onClick={() => scrollToSection('eco-impact')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Leaf className="w-4 h-4 text-emerald-400" />
            Eco Savings
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Unit Toggle Button */}
          <button
            onClick={toggleUnit}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
            title="Toggle between metric (cm) and imperial (in)"
          >
            <span className={unit === 'metric' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>cm</span>
            <span className="text-slate-600">/</span>
            <span className={unit === 'imperial' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>in</span>
          </button>

          {/* Quick Profile Badge */}
          {hasCustomProfile && (
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{measurements.chest}cm Chest | {measurements.waist}cm Waist</span>
            </div>
          )}

          {/* Scan Body CTA */}
          <button
            onClick={() => setIsScannerOpen(true)}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40 active:scale-95"
          >
            <Camera className="h-4 w-4 transition-transform group-hover:rotate-12" />
            <span>{hasCustomProfile ? 'Re-scan Body' : 'Create FitProfile'}</span>
          </button>

        </div>
      </div>
    </header>
  );
}
