'use client';

import React, { FormEvent, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  brand: '',
  storeUrl: '',
  platform: 'Shopify',
  category: '',
  productCount: '',
  challenge: '',
  timeline: 'Exploring options',
  website: '',
};

type FormState = typeof initialForm;

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export function PilotRequestForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/pilot-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'We could not submit your request.');
      }

      setSubmissionState('success');
      setMessage('Thanks—we received your request and will review whether a focused pilot is practical for your store.');
      setForm(initialForm);
    } catch (error) {
      setSubmissionState('error');
      setMessage(error instanceof Error ? error.message : 'We could not submit your request. Please try again.');
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-500/25 bg-slate-900/70 p-6 shadow-2xl shadow-emerald-950/20 sm:p-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Pilot assessment</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Find out whether your store is ready.</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">Tell us about your store and the product category you want to improve. We will use these details to assess whether a focused FitPrint pilot is practical.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Name</span>
            <input required maxLength={100} value={form.name} onChange={(event) => updateField('name', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="Your name" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Work email</span>
            <input required type="email" maxLength={160} value={form.email} onChange={(event) => updateField('email', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="you@brand.com" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Brand or store name</span>
            <input required maxLength={120} value={form.brand} onChange={(event) => updateField('brand', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="Your brand" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Store URL</span>
            <input type="url" maxLength={240} value={form.storeUrl} onChange={(event) => updateField('storeUrl', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="https://yourstore.com" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Commerce platform</span>
            <select value={form.platform} onChange={(event) => updateField('platform', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400">
              <option>Shopify</option>
              <option>WooCommerce</option>
              <option>BigCommerce</option>
              <option>Custom storefront</option>
              <option>Other</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Product category to test</span>
            <input required maxLength={120} value={form.category} onChange={(event) => updateField('category', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="e.g. denim or trousers" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Approximate products in that category</span>
            <input maxLength={40} value={form.productCount} onChange={(event) => updateField('productCount', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="e.g. 25" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Pilot timeline</span>
            <select value={form.timeline} onChange={(event) => updateField('timeline', event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400">
              <option>Exploring options</option>
              <option>This month</option>
              <option>This quarter</option>
              <option>Later this year</option>
            </select>
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-slate-200">
          <span>What is your biggest sizing or fit challenge?</span>
          <textarea required maxLength={1000} rows={4} value={form.challenge} onChange={(event) => updateField('challenge', event.target.value)} className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400" placeholder="Tell us what happens today when shoppers are unsure about fit." />
        </label>

        <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(event) => updateField('website', event.target.value)} className="hidden" />

        {message && (
          <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${submissionState === 'success' ? 'border-emerald-700/60 bg-emerald-950/50 text-emerald-200' : 'border-rose-700/60 bg-rose-950/40 text-rose-200'}`}>
            {message}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-slate-500">We will use these details only to assess whether a FitPrint pilot is a practical fit for your store.</p>
          <button disabled={submissionState === 'submitting'} type="submit" className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/15 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60">
            {submissionState === 'submitting' ? 'Sending…' : 'Request my pilot assessment'}
          </button>
        </div>
      </form>
    </div>
  );
}
