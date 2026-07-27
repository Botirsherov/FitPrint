'use client';

import React from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { ZoneFitDetail, FitStatus } from '@/types';
import { cmToInches } from '@/lib/fitEngine';
import { CheckCircle2, AlertTriangle, XCircle, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function FitHeatmap() {
  const { fitAnalysis, unit } = useFitProfile();
  const { zoneDetails } = fitAnalysis;

  const formatDiff = (diffCm: number) => {
    if (diffCm === 0) return 'Exact Fit';
    const val = unit === 'metric' ? `${Math.abs(diffCm)} cm` : `${cmToInches(Math.abs(diffCm))} in`;
    return diffCm > 0 ? `+${val} (Loose)` : `-${val} (Tight)`;
  };

  const getStatusColor = (status: FitStatus) => {
    switch (status) {
      case 'perfect':
        return {
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-500/50',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-950',
          badgeText: 'text-emerald-300',
          fill: '#10b981',
          label: 'Ideal Fit',
          icon: CheckCircle2,
        };
      case 'slightly_loose':
      case 'slightly_tight':
        return {
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/50',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-950',
          badgeText: 'text-amber-300',
          fill: '#f59e0b',
          label: status === 'slightly_loose' ? 'Slightly Loose' : 'Slightly Tight',
          icon: AlertTriangle,
        };
      case 'too_tight':
      case 'too_loose':
        return {
          bg: 'bg-rose-500/20',
          border: 'border-rose-500/50',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-950',
          badgeText: 'text-rose-300',
          fill: '#f43f5e',
          label: status === 'too_tight' ? 'Too Tight' : 'Too Loose',
          icon: XCircle,
        };
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
      
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Visual Fit Heatmap & Zone Map</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Real-time Pressure Evaluation
        </span>
      </div>

      {/* Heatmap Layout: Left SVG Silhouette, Right Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Visual Heatmap Body Silhouette */}
        <div className="md:col-span-5 relative flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 h-80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%)]"></div>

          {/* Dynamic Color Zones SVG */}
          <div className="relative w-40 h-64 flex flex-col items-center justify-between py-2">
            
            {/* Shoulders Zone */}
            {zoneDetails.find((z) => z.zoneName.includes('Shoulder')) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-36 h-4 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Shoulder'))!.status).fill }}
              >
                <span className="text-[9px] font-extrabold text-slate-950 font-mono">SHOULDERS</span>
              </motion.div>
            )}

            {/* Chest / Bust Zone */}
            {zoneDetails.find((z) => z.zoneName.includes('Chest')) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-14 rounded-xl flex flex-col items-center justify-center shadow-lg transition-colors cursor-pointer border border-slate-950"
                style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Chest'))!.status).fill }}
              >
                <span className="text-[10px] font-extrabold text-slate-950 font-mono">CHEST</span>
                <span className="text-[9px] font-bold text-slate-900 font-mono">
                  {zoneDetails.find((z) => z.zoneName.includes('Chest'))!.score}% Match
                </span>
              </motion.div>
            )}

            {/* Waist Zone */}
            {zoneDetails.find((z) => z.zoneName.includes('Waist')) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-10 rounded-lg flex flex-col items-center justify-center shadow-lg transition-colors cursor-pointer border border-slate-950"
                style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Waist'))!.status).fill }}
              >
                <span className="text-[10px] font-extrabold text-slate-950 font-mono">WAIST</span>
              </motion.div>
            )}

            {/* Hips Zone */}
            {zoneDetails.find((z) => z.zoneName.includes('Hips')) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-28 h-10 rounded-lg flex flex-col items-center justify-center shadow-lg transition-colors cursor-pointer border border-slate-950"
                style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Hips'))!.status).fill }}
              >
                <span className="text-[10px] font-extrabold text-slate-950 font-mono">HIPS</span>
              </motion.div>
            )}

            {/* Inseam / Legs Zone */}
            {zoneDetails.find((z) => z.zoneName.includes('Inseam')) && (
              <div className="w-24 flex justify-between">
                <div
                  className="w-3 h-14 rounded-b shadow-lg"
                  style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Inseam'))!.status).fill }}
                ></div>
                <div
                  className="w-3 h-14 rounded-b shadow-lg"
                  style={{ backgroundColor: getStatusColor(zoneDetails.find((z) => z.zoneName.includes('Inseam'))!.status).fill }}
                ></div>
              </div>
            )}

          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2 text-[11px] font-medium text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Perfect
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Slightly Loose/Tight
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Poor Fit
            </span>
          </div>

        </div>

        {/* Right Column: Zone Breakdown List */}
        <div className="md:col-span-7 space-y-3">
          {zoneDetails.map((zone) => {
            const conf = getStatusColor(zone.status);
            const Icon = conf.icon;

            return (
              <div
                key={zone.zoneName}
                className={`rounded-2xl border ${conf.border} ${conf.bg} p-3.5 flex items-center justify-between transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${conf.text} shrink-0`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{zone.zoneName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conf.badgeBg} ${conf.badgeText} border border-slate-800`}>
                        {conf.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">{zone.feedback}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-extrabold ${conf.text} font-mono`}>
                    {zone.score}%
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {formatDiff(zone.differenceCm)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
