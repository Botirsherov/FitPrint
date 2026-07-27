'use client';

import React from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { cmToInches } from '@/lib/fitEngine';
import { X, Table, Ruler, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SizeChartModal() {
  const { isSizeChartOpen, setIsSizeChartOpen, selectedGarment, selectedSize, unit } = useFitProfile();

  if (!isSizeChartOpen) return null;

  const formatVal = (cmVal: number) => {
    if (cmVal === 0) return '—';
    return unit === 'metric' ? `${cmVal} cm` : `${cmToInches(cmVal)} in`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <Table className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-base font-bold text-white">Sizing Chart & Specifications</h3>
                <p className="text-xs text-slate-400">{selectedGarment.brand} - {selectedGarment.name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Table Content */}
          <div className="p-6 space-y-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <th className="py-3 px-4">Size Tag</th>
                  <th className="py-3 px-4">Chest / Bust</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                  <th className="py-3 px-4">Shoulders</th>
                  <th className="py-3 px-4">Inseam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {selectedGarment.sizes.map((spec) => {
                  const isSelected = spec.size === selectedSize;
                  return (
                    <tr
                      key={spec.size}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-emerald-950/60 font-bold text-emerald-300'
                          : 'text-slate-300 hover:bg-slate-950/50'
                      }`}
                    >
                      <td className="py-3 px-4 flex items-center gap-2">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-white">
                          {spec.size}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{formatVal(spec.chest)}</td>
                      <td className="py-3 px-4">{formatVal(spec.waist)}</td>
                      <td className="py-3 px-4">{formatVal(spec.hips)}</td>
                      <td className="py-3 px-4">{formatVal(spec.shoulderWidth)}</td>
                      <td className="py-3 px-4">{formatVal(spec.inseam)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Fitting Guidance:</p>
              <p>• {selectedGarment.fitType.toUpperCase()} FIT: {selectedGarment.description}</p>
              <p>• Material: {selectedGarment.material}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
