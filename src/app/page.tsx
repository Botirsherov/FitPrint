'use client';

import React from 'react';
import { LandingHero } from '@/components/LandingHero';
import { GarmentChecker } from '@/components/GarmentChecker';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import { EcoImpactSection } from '@/components/EcoImpactSection';

export default function Home() {
  return (
    <div className="space-y-4">
      <LandingHero />
      <GarmentChecker />
      <ProfileDashboard />
      <EcoImpactSection />
    </div>
  );
}
