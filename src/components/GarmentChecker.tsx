'use client';

import React, { useState } from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { SAMPLE_GARMENTS } from '@/lib/garmentsData';
import { Garment, GarmentSizeSpec } from '@/types';
import { analyzeGarmentFit } from '@/lib/fitEngine';
import { FitHeatmap } from './FitHeatmap';
import { FitFeedbackCard } from './FitFeedbackCard';
import { SizeChartModal } from './SizeChartModal';
import { Shirt, Link as LinkIcon, Sparkles, Check, Table, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function GarmentChecker() {
  const {
    selectedGarment,
    setSelectedGarment,
    selectedSize,
    setSelectedSize,
    setIsSizeChartOpen,
    measurements,
  } = useFitProfile();

  const [pastedUrl, setPastedUrl] = useState<string>('');
  const [isUrlParsed, setIsUrlParsed] = useState<boolean>(false);
  const [parsedItemName, setParsedItemName] = useState<string>('');

  // Handle pasting product link
  const handleParseUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedUrl.trim()) return;

    // Simulate parsing e-commerce page title & brand from URL
    let extractedName = 'Parsed E-Commerce Garment';
    if (pastedUrl.includes('levi')) extractedName = 'Levi\'s Custom Denim Fit';
    else if (pastedUrl.includes('zara')) extractedName = 'Zara Tailored Fit Apparel';
    else if (pastedUrl.includes('patagonia')) extractedName = 'Patagonia Sustainable Outerwear';
    else if (pastedUrl.includes('everlane')) extractedName = 'Everlane Essential Piece';

    setParsedItemName(extractedName);
    setIsUrlParsed(true);

    // Create dynamic parsed garment entry
    const customGarment: Garment = {
      id: `custom-${Date.now()}`,
      name: extractedName,
      brand: 'Imported E-Store Item',
      category: 'tshirt',
      imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80',
      price: '$85.00',
      description: 'Extracted product specifications via FitPrint e-commerce crawler.',
      fitType: 'regular',
      material: '100% Organic Cotton',
      productUrl: pastedUrl,
      sizes: [
        { size: 'S', chest: 94, waist: 82, hips: 94, shoulderWidth: 43, inseam: 80 },
        { size: 'M', chest: 100, waist: 88, hips: 100, shoulderWidth: 45, inseam: 81 },
        { size: 'L', chest: 106, waist: 94, hips: 106, shoulderWidth: 47, inseam: 82 },
        { size: 'XL', chest: 114, waist: 102, hips: 114, shoulderWidth: 49, inseam: 82 },
      ],
    };

    setSelectedGarment(customGarment);
  };

  return (
    <section id="fit-engine" className="py-12 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <Shirt className="w-4 h-4 text-emerald-400" />
            <span>Virtual Fit Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Select a Garment & Check Your Fit
          </h2>
          <p className="text-sm text-slate-300">
            Paste any clothing link or select from our sample wardrobe to compare your 3D body profile against real sizing charts.
          </p>
        </div>

        {/* URL Link Parser Box */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleParseUrl} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={pastedUrl}
                onChange={(e) => setPastedUrl(e.target.value)}
                placeholder="Paste product URL (e.g. levi.com, zara.com, everlane.com...)"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              Analyze Product Link
            </button>
          </form>

          {isUrlParsed && (
            <div className="mt-3 flex items-center justify-between text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-800 p-2.5 rounded-xl">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-400" /> Loaded product: <strong>{parsedItemName}</strong>
              </span>
              <a
                href={pastedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                Visit Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Sample Wardrobe Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Or Choose Sample Wardrobe Item:
            </h3>
            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Table className="w-4 h-4" /> View Full Size Specs
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SAMPLE_GARMENTS.map((item) => {
              const isSelected = selectedGarment.id === item.id;
              // Calculate default M fit score for quick preview badge
              const quickAnalysis = analyzeGarmentFit(measurements, item, 'M');

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedGarment(item)}
                  className={`group relative rounded-2xl border p-3 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-950 mb-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-800">
                      {item.brand}
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-700/50">
                      {quickAnalysis.overallScore}% Fit
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Garment Detail Bar & Size Switcher */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
              <img src={selectedGarment.imageUrl} alt={selectedGarment.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">{selectedGarment.brand}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {selectedGarment.fitType} fit
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{selectedGarment.name}</h3>
            </div>
          </div>

          {/* Interactive Size Switcher Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2 hidden sm:inline">Select Size:</span>
            {selectedGarment.sizes.map((s) => {
              const isSelectedSize = s.size === selectedSize;
              const sizeAnalysis = analyzeGarmentFit(measurements, selectedGarment, s.size);
              const score = sizeAnalysis.overallScore;

              let badgeColor = 'border-slate-800 bg-slate-950 text-slate-300';
              if (score >= 88) badgeColor = 'border-emerald-500 bg-emerald-950 text-emerald-300';
              else if (score >= 70) badgeColor = 'border-amber-500/60 bg-amber-950 text-amber-300';
              else badgeColor = 'border-rose-500/60 bg-rose-950 text-rose-300';

              return (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl border text-xs font-bold transition-all ${
                    isSelectedSize
                      ? 'scale-110 shadow-lg border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-950 text-white'
                      : badgeColor
                  }`}
                >
                  <span className="font-mono text-sm">{s.size}</span>
                  <span className="text-[9px] font-mono opacity-80">{score}%</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Comparison Engine Output: Feedback Card & Heatmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <FitFeedbackCard />
          </div>
          <div className="lg:col-span-6">
            <FitHeatmap />
          </div>
        </div>

        <SizeChartModal />

      </div>
    </section>
  );
}
