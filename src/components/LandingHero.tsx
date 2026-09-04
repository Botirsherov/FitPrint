'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Ruler, Shirt, Sparkles, Target } from 'lucide-react';
import { useFitProfile } from '@/context/FitProfileContext';

export function LandingHero() {
  const { setIsScannerOpen } = useFitProfile();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-900 pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.16),rgba(2,6,23,0))]" />
      <div className="absolute right-[-10rem] top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="absolute left-[-12rem] bottom-[-12rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-7 text-center lg:col-span-7 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold text-emerald-300"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Fit intelligence for online apparel brands
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Help shoppers choose the right fit{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              before they buy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0"
          >
            FitPrint gives apparel shoppers a clearer size recommendation and explains where a garment may feel tight, loose, short, or long. Start with a focused product category, measure what changes, and expand with evidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              onClick={() => scrollToSection('pilot')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/35 sm:w-auto"
            >
              Explore the pilot
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('fit-engine')}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-emerald-500/50 hover:bg-slate-800 sm:w-auto"
            >
              <Shirt className="h-4 w-4 text-emerald-400" />
              Try the interactive demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="grid max-w-xl grid-cols-3 gap-4 border-t border-slate-800/80 pt-6 text-center lg:text-left"
          >
            <div>
              <Ruler className="mx-auto mb-2 h-4 w-4 text-emerald-400 lg:mx-0" />
              <p className="text-sm font-bold text-white">Body profile</p>
              <p className="mt-1 text-xs text-slate-400">A clearer starting point</p>
            </div>
            <div>
              <Target className="mx-auto mb-2 h-4 w-4 text-teal-300 lg:mx-0" />
              <p className="text-sm font-bold text-white">Zone guidance</p>
              <p className="mt-1 text-xs text-slate-400">More than a size letter</p>
            </div>
            <div>
              <BarChart3 className="mx-auto mb-2 h-4 w-4 text-cyan-300 lg:mx-0" />
              <p className="text-sm font-bold text-white">Pilot evidence</p>
              <p className="mt-1 text-xs text-slate-400">Learn before scaling</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative lg:col-span-5"
        >
          <div className="mx-auto max-w-md rounded-3xl border border-emerald-500/25 bg-slate-900/80 p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">Illustrative fit output</p>
                <p className="mt-1 text-sm font-bold text-white">Product-page fit view</p>
              </div>
              <span className="rounded-full border border-emerald-700/50 bg-emerald-950/70 px-2.5 py-1 text-[10px] font-mono text-emerald-300">Demo</span>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-40" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex h-40 w-28 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 rounded-full border-2 border-emerald-400/80 bg-emerald-950/70" />
                    <div className="h-20 w-14 rounded-[2rem] border-2 border-dashed border-emerald-400/70 bg-emerald-950/30" />
                    <div className="flex gap-2">
                      <div className="h-10 w-3 rounded-b-full bg-teal-400/70" />
                      <div className="h-10 w-3 rounded-b-full bg-teal-400/70" />
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-[11px] text-slate-400">Recommended starting size</p>
                    <p className="mt-1 text-3xl font-extrabold text-white">M</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-emerald-800/60 bg-emerald-950/50 px-3 py-2">
                      <span className="text-slate-300">Waist</span>
                      <span className="font-semibold text-emerald-300">Comfortable</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-amber-800/60 bg-amber-950/40 px-3 py-2">
                      <span className="text-slate-300">Inseam</span>
                      <span className="font-semibold text-amber-300">Slightly short</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-teal-800/60 bg-teal-950/40 px-3 py-2">
                      <span className="text-slate-300">Hips</span>
                      <span className="font-semibold text-teal-300">Good match</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3">
              <div>
                <p className="text-xs font-semibold text-white">Built to be tested</p>
                <p className="mt-1 text-[11px] text-slate-400">Start with one category and up to 20 products.</p>
              </div>
              <button
                onClick={() => setIsScannerOpen(true)}
                className="rounded-lg border border-emerald-500/40 px-3 py-2 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                Try it
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
