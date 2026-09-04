'use client';

import React from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { cmToInches, inchesToCm } from '@/lib/fitEngine';
import { BodyMeasurements } from '@/types';
import { Ruler, Sliders, RefreshCw, Camera, Sparkles, UserCheck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfileDashboard() {
  const {
    measurements,
    updateMeasurement,
    unit,
    toggleUnit,
    applyPreset,
    resetMeasurements,
    setIsScannerOpen,
    hasCustomProfile,
  } = useFitProfile();

  // Helper to format values according to metric or imperial unit
  const formatVal = (cmVal: number) => {
    return unit === 'metric' ? `${cmVal} cm` : `${cmToInches(cmVal)} in`;
  };

  const handleSliderChange = (key: keyof BodyMeasurements, rawVal: number) => {
    const cmVal = unit === 'imperial' ? inchesToCm(rawVal) : rawVal;
    updateMeasurement(key, cmVal);
  };

  const getDisplayVal = (cmVal: number) => {
    return unit === 'imperial' ? cmToInches(cmVal) : cmVal;
  };

  return (
    <section id="body-profile" className="py-12 bg-slate-950/60 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Ruler className="w-4 h-4" />
              <span>Example shopper profile</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              FitProfile example
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              See how a shopper profile can inform fit recommendations. A merchant pilot would define the data and consent flow for its storefront.
            </p>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleUnit}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unit: <strong className="text-emerald-400">{unit === 'metric' ? 'Metric (cm)' : 'Imperial (in)'}</strong></span>
            </button>

            <button
              onClick={() => setIsScannerOpen(true)}
              className="rounded-xl bg-emerald-500/10 border border-emerald-500/40 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>{hasCustomProfile ? 'Re-scan with AI' : 'Scan Body'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Silhouette & Presets */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Anatomical Proportions
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {measurements.height}cm / {measurements.weight}kg
                </span>
              </div>

              {/* 2D Body Graphic with Live Measurement Labels */}
              <div className="relative h-72 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]"></div>

                <div className="relative flex flex-col items-center justify-center space-y-2">
                  {/* Head */}
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400/80 bg-emerald-950/50 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-emerald-300">HEAD</span>
                  </div>

                  {/* Chest */}
                  <div className="relative w-36 py-1 border-t-2 border-b-2 border-emerald-400/80 rounded bg-emerald-950/40 text-center">
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      Chest: {formatVal(measurements.chest)}
                    </span>
                  </div>

                  {/* Waist */}
                  <div className="relative w-28 py-1 border-t-2 border-b-2 border-teal-300/80 rounded bg-teal-950/40 text-center">
                    <span className="text-xs font-mono font-bold text-teal-200">
                      Waist: {formatVal(measurements.waist)}
                    </span>
                  </div>

                  {/* Hips */}
                  <div className="relative w-32 py-1 border-t-2 border-b-2 border-emerald-400/80 rounded bg-emerald-950/40 text-center">
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      Hips: {formatVal(measurements.hips)}
                    </span>
                  </div>

                  {/* Legs / Inseam */}
                  <div className="w-28 flex justify-between pt-1">
                    <div className="w-3 h-16 bg-slate-800 rounded-b border-t-2 border-teal-400"></div>
                    <span className="text-[10px] font-mono text-slate-400 self-center">
                      Inseam: {formatVal(measurements.inseam)}
                    </span>
                    <div className="w-3 h-16 bg-slate-800 rounded-b border-t-2 border-teal-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-400 mb-2">Test Quick Presets:</p>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => applyPreset('slim')}
                  className="rounded-lg border border-slate-800 bg-slate-950 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Slim
                </button>
                <button
                  onClick={() => applyPreset('athletic')}
                  className="rounded-lg border border-slate-800 bg-slate-950 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Athletic
                </button>
                <button
                  onClick={() => applyPreset('curvy')}
                  className="rounded-lg border border-slate-800 bg-slate-950 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Curvy
                </button>
                <button
                  onClick={() => applyPreset('tall')}
                  className="rounded-lg border border-slate-800 bg-slate-950 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Tall
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Measurement Fine-Tuning Sliders */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Fine-Tune Measurements
              </span>
              <button
                onClick={resetMeasurements}
                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Chest / Bust Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Chest / Bust Circumference</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatVal(measurements.chest)}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? 70 : 28}
                  max={unit === 'metric' ? 140 : 55}
                  step={unit === 'metric' ? 1 : 0.5}
                  value={getDisplayVal(measurements.chest)}
                  onChange={(e) => handleSliderChange('chest', Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Waist Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Waist Circumference</span>
                  <span className="font-mono text-teal-300 font-bold">{formatVal(measurements.waist)}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? 60 : 24}
                  max={unit === 'metric' ? 130 : 51}
                  step={unit === 'metric' ? 1 : 0.5}
                  value={getDisplayVal(measurements.waist)}
                  onChange={(e) => handleSliderChange('waist', Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Hips Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Hips Circumference</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatVal(measurements.hips)}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? 70 : 28}
                  max={unit === 'metric' ? 140 : 55}
                  step={unit === 'metric' ? 1 : 0.5}
                  value={getDisplayVal(measurements.hips)}
                  onChange={(e) => handleSliderChange('hips', Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Inseam Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Inseam Leg Length</span>
                  <span className="font-mono text-teal-300 font-bold">{formatVal(measurements.inseam)}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? 65 : 25}
                  max={unit === 'metric' ? 100 : 39}
                  step={unit === 'metric' ? 1 : 0.5}
                  value={getDisplayVal(measurements.inseam)}
                  onChange={(e) => handleSliderChange('inseam', Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Shoulder Width Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Shoulder Span</span>
                  <span className="font-mono text-emerald-400 font-bold">{formatVal(measurements.shoulderWidth)}</span>
                </div>
                <input
                  type="range"
                  min={unit === 'metric' ? 35 : 14}
                  max={unit === 'metric' ? 60 : 24}
                  step={unit === 'metric' ? 1 : 0.5}
                  value={getDisplayVal(measurements.shoulderWidth)}
                  onChange={(e) => handleSliderChange('shoulderWidth', Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
