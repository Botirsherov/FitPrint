'use client';

import React, { useState } from 'react';
import { Leaf, Recycle, Truck, ShieldAlert, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFitProfile } from '@/context/FitProfileContext';

export function EcoImpactSection() {
  const { setIsScannerOpen } = useFitProfile();
  const [annualPurchases, setAnnualPurchases] = useState<number>(18);

  // Industry averages:
  // ~35% of online apparel orders are returned due to sizing issues.
  // 1 return shipping cycle ~ 2.5 kg CO2e
  // 1 return reprocessing ~ 14.2 L water
  // 1 return packaging ~ 0.35 kg cardboard/plastic
  const expectedReturnsWithoutFitPrint = Math.round(annualPurchases * 0.35);
  const totalCo2Saved = (expectedReturnsWithoutFitPrint * 2.5).toFixed(1);
  const totalWaterSaved = (expectedReturnsWithoutFitPrint * 14.2).toFixed(0);
  const totalPackagingSaved = (expectedReturnsWithoutFitPrint * 0.35).toFixed(1);

  return (
    <section id="eco-impact" className="py-16 bg-slate-950/80 border-t border-slate-900 relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Sustainable Fashion Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How FitPrint Eliminates Return Waste
          </h2>
          <p className="text-sm text-slate-300">
            Over 30% of online clothing orders are returned due to wrong sizing—generating millions of tons of unnecessary CO2 and packaging waste. See your personal environmental savings below.
          </p>
        </div>

        {/* Interactive Simulator Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur-2xl shadow-2xl max-w-4xl mx-auto space-y-8">
          
          {/* Slider Input */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-200">How many apparel items do you buy online per year?</span>
              <span className="text-emerald-400 font-mono text-base font-bold">{annualPurchases} items / year</span>
            </div>
            <input
              type="range"
              min={2}
              max={60}
              step={1}
              value={annualPurchases}
              onChange={(e) => setAnnualPurchases(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>2 items</span>
              <span>30 items</span>
              <span>60 items</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 space-y-2 text-center"
            >
              <div className="flex justify-center text-emerald-400 mb-1">
                <Truck className="w-8 h-8" />
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{totalCo2Saved} kg</p>
              <p className="text-xs font-bold text-emerald-300">CO2 Emissions Avoided</p>
              <p className="text-[11px] text-slate-400">Equivalent to driving ~150 km in a gas car.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-teal-500/30 bg-teal-950/40 p-5 space-y-2 text-center"
            >
              <div className="flex justify-center text-teal-300 mb-1">
                <Recycle className="w-8 h-8" />
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{totalWaterSaved} L</p>
              <p className="text-xs font-bold text-teal-200">Water Saved</p>
              <p className="text-[11px] text-slate-400">Saved from garment restretching and cleaning.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 space-y-2 text-center"
            >
              <div className="flex justify-center text-emerald-400 mb-1">
                <TrendingDown className="w-8 h-8" />
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{totalPackagingSaved} kg</p>
              <p className="text-xs font-bold text-emerald-300">Packaging Saved</p>
              <p className="text-[11px] text-slate-400">Avoided polybags and shipping cardboard.</p>
            </motion.div>

          </div>

          {/* CTA Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Join the Zero-Return Fashion Movement</p>
                <p className="text-[11px] text-slate-400">Scan once, get perfect fit recommendations everywhere.</p>
              </div>
            </div>

            <button
              onClick={() => setIsScannerOpen(true)}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Scan My Body Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
