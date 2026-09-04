'use client';

import React from 'react';
import { BarChart3, Check, Database, Layers3, ShieldCheck, Target } from 'lucide-react';
import { LandingHero } from '@/components/LandingHero';
import { GarmentChecker } from '@/components/GarmentChecker';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import { EcoImpactSection } from '@/components/EcoImpactSection';
import { PilotRequestForm } from '@/components/PilotRequestForm';

const pilotIncludes = [
  'One storefront and one product category',
  'Up to 20 products or SKUs',
  'Assisted product and size-data onboarding',
  'Shopper body-profile flow',
  'Recommended size with zone-level guidance',
  'Basic merchant reporting and results review',
];

const measures = [
  'Fit-profile completion and recommendation views',
  'Recommended-size acceptance and purchase behavior',
  'Exchanges, returns, and stated fit-related reasons',
  'Recurring uncertainty by garment zone',
];

export default function Home() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <LandingHero />

      <section id="how-it-works" className="border-b border-slate-900 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">A practical starting point</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Start with one category. Learn what deserves to scale.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">FitPrint is designed to help apparel teams test a clearer fit experience without committing to a full catalog rollout first.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="border-t border-emerald-500/50 pt-5">
              <Database className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-4 text-lg font-bold text-white">1. Choose the right products</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Begin with a fit-sensitive category such as denim, trousers, suiting, uniforms, or workwear.</p>
            </div>
            <div className="border-t border-teal-400/50 pt-5">
              <Layers3 className="h-5 w-5 text-teal-300" />
              <h3 className="mt-4 text-lg font-bold text-white">2. Give shoppers more context</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Combine product and size information with a lightweight profile and plain-language zone guidance.</p>
            </div>
            <div className="border-t border-cyan-400/50 pt-5">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
              <h3 className="mt-4 text-lg font-bold text-white">3. Measure before expanding</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Review adoption, fit feedback, exchanges, returns, and other outcomes available in your store.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pilot" className="border-b border-slate-900 bg-slate-950/80 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">The FitPrint pilot</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">A focused test for one storefront and one category.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">Validate product data, shopper adoption, and business value before investing in a broader rollout.</p>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-sm leading-relaxed text-slate-300">No unsupported promise of a specific return reduction. The pilot establishes a baseline and measures what changes.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-950/20 sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Fit Intelligence Pilot</p>
                  <p className="mt-2 text-4xl font-extrabold text-white">$1,500 <span className="text-base font-medium text-slate-400">setup</span></p>
                  <p className="mt-1 text-sm text-slate-400">+ $249/month · 45-day pilot · no annual contract</p>
                </div>
                <span className="w-fit rounded-full border border-emerald-700/50 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300">Design-partner offer</span>
              </div>

              <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {pilotIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => scrollToSection('pilot-request')}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
                >
                  Request a pilot assessment
                </button>
                <button
                  onClick={() => scrollToSection('fit-engine')}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3.5 text-sm font-bold text-slate-200 transition hover:border-emerald-500/50 hover:bg-slate-900"
                >
                  Explore the demo
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">Start with a demo, then discuss whether your catalog is ready for a pilot.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="measurement" className="border-b border-slate-900 bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Pilot measurement</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">See what shoppers need before you scale.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">The first version of FitPrint is built around learning. Track the signals your store can actually observe, then use them to choose the next product group.</p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {measures.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <Target className="h-5 w-5 text-teal-300" />
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pilot-request" className="border-b border-slate-900 bg-slate-950/80 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <PilotRequestForm />
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Built for focused learning</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Give shoppers a better answer than “check the size chart.”</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">Try the interactive experience below, then decide whether FitPrint is a practical fit for your product category.</p>
          <button
            onClick={() => scrollToSection('fit-engine')}
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-6 py-3.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Open the fit engine
          </button>
        </div>
      </section>

      <GarmentChecker />
      <ProfileDashboard />
      <EcoImpactSection />
    </div>
  );
}
