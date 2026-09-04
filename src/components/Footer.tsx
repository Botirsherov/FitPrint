'use client';

import React from 'react';
import { Heart, Leaf, Ruler } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-900 pb-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600">
              <Ruler className="h-4 w-4 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white">
                Fit<span className="text-emerald-400">Print</span>
              </span>
              <p className="text-[11px] text-slate-400">Explainable fit intelligence for apparel brands</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-emerald-300">
            <Leaf className="h-4 w-4 text-emerald-400" />
            <span>Start with one category. Measure what changes.</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[11px] text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FitPrint. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for thoughtful fashion technology</span>
            <Heart className="inline h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
