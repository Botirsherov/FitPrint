
# 📏 FitPrint — Measure. Sustain. Wear.

> **Hackathon Entry for "Measureme up!" hosted by snap2measure**  
> *Eliminating sizing guesswork and reducing fashion return waste through AI-powered body measurement.*

---

## 🌟 Overview

Online fashion shopping has a major hidden environmental cost: **up to 40% of apparel bought online is returned**, mostly due to poor sizing. Millions of returned items end up in landfills or generate unnecessary transit carbon emissions.

**FitPrint** solves this by creating a seamless, frictionless virtual fitting experience. Using the **SnapMeasure API**, users generate an accurate digital body profile from a quick scan or photo. FitPrint then overlays these measurements against garment size charts to provide a visual fit breakdown, fit confidence score, and estimated environmental savings.

---

## ✨ Key Features

* **⚡ Instant SnapMeasure Scanning:** Seamlessly calls the SnapMeasure API to extract key body metrics (chest, waist, hips, inseam, shoulder width).
* **👤 Digital Fit Profile:** Persistent, privacy-first local storage of your body dimensions for one-click fit checks across shops.
* **🎯 Garment Compatibility Engine:** Compares user metrics against real clothing size charts (S, M, L, XL) and provides precise size recommendations.
* **📊 Visual Fit Heatmap:** Identifies tight, loose, or ideal zones on garments before you buy.
* **🌱 Sustainability Impact Counter:** Quantifies saved $CO_2$ emissions and packaging waste by preventing returns.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React / Next.js (App Router), Tailwind CSS, Framer Motion
* **API Integration:** SnapMeasure API (Server-side API routes)
* **Icons & UI:** Lucide React, Shadcn UI
* **State Management:** LocalStorage / React Context

---

## 🔌 SnapMeasure API Integration

FitPrint integrates the **SnapMeasure API** via a secure backend route wrapper (`/api/snapmeasure`).

```text
[ User Image / Scan ] 
         │
         ▼
[ /api/snapmeasure (Next.js Server Action) ]
         │
         ▼ (Secure API Request with Auth Header)
[ SnapMeasure API Endpoint ]
         │
         ▼
[ Parsed Body Metrics JSON ] ──> [ Fit Profile Dashboard & Comparison Engine ]
```


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.