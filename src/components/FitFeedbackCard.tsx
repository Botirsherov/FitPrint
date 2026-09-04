'use client';

import React, { useEffect } from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { Leaf, Award, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, ArrowUpRight, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export function FitFeedbackCard() {
  const { fitAnalysis, selectedGarment, selectedSize } = useFitProfile();
  const { overallScore, bestMatchingSize, recommendationTitle, recommendationSummary, ecoImpact } = fitAnalysis;

  // Trigger confetti celebration on high score fit
  useEffect(() => {
    if (overallScore >= 88) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#2dd4bf', '#34d399'],
        });
      } catch (e) {
        // Ignore if confetti not supported
      }
    }
  }, [overallScore, selectedGarment.id, selectedSize]);

  // Color mappings for overall score
  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        text: 'text-emerald-400',
        stroke: '#10b981',
        bg: 'from-emerald-500/20 to-teal-500/10',
        border: 'border-emerald-500/40',
        badge: 'bg-emerald-950 text-emerald-300 border-emerald-700/50',
      };
    } else if (score >= 70) {
      return {
        text: 'text-amber-400',
        stroke: '#f59e0b',
        bg: 'from-amber-500/20 to-yellow-500/10',
        border: 'border-amber-500/40',
        badge: 'bg-amber-950 text-amber-300 border-amber-700/50',
      };
    } else {
      return {
        text: 'text-rose-400',
        stroke: '#f43f5e',
        bg: 'from-rose-500/20 to-pink-500/10',
        border: 'border-rose-500/40',
        badge: 'bg-rose-950 text-rose-300 border-rose-700/50',
      };
    }
  };

  const theme = getScoreTheme(overallScore);

  return (
    <div className={`rounded-3xl border ${theme.border} bg-gradient-to-br ${theme.bg} p-6 backdrop-blur-2xl space-y-6 shadow-2xl relative overflow-hidden`}>
      
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className={`w-5 h-5 ${theme.text}`} />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            AI Virtual Fit Analysis
          </span>
        </div>

        <span className={`rounded-full border px-3 py-0.5 text-xs font-bold font-mono ${theme.badge}`}>
          Size {selectedSize}
        </span>
      </div>

      {/* Fit Score & Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Score Ring */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG Circular Progress Bar */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={theme.stroke}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * overallScore) / 100 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-2xl font-extrabold font-mono ${theme.text}`}>
                {overallScore}%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Fit Match</span>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-200 mt-2">
            Best Match: <strong className="text-emerald-400">Size {bestMatchingSize}</strong>
          </p>
        </div>

        {/* Recommendation Text */}
        <div className="md:col-span-8 space-y-3">
          <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
            {recommendationTitle}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {recommendationSummary}
          </p>

          {/* Eco Impact Banner */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Leaf className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Eco Impact Stat</span>
            </div>
            <p className="text-xs text-emerald-200 leading-relaxed">
              &quot;This illustrative result shows how a clearer fit decision could support a more useful sustainability story. Actual impact should be measured from your store&apos;s own outcomes.&quot;
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
