'use client';

import React from 'react';
import { Ruler, Leaf, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600">
              <Ruler className="h-4 w-4 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white">
                Fit<span className="text-emerald-400">Print</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Zero-Return Virtual Fit Engine powered by SnapMeasure AI
              </p>
            </div>
          </div>

          {/* Hackathon Badge */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-emerald-300">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Built for <strong>Measureme up! Hackathon</strong> by <strong>snap2measure</strong></span>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FitPrint. All rights reserved. SnapMeasure API https://www.snap2wear.xyz/</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for sustainable fashion technology</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
