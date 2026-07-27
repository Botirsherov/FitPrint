'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BodyMeasurements, UnitSystem, Garment, GarmentSizeSpec, FitAnalysisResult } from '@/types';
import { DEFAULT_MEASUREMENTS } from '@/lib/snapmeasure';
import { SAMPLE_GARMENTS } from '@/lib/garmentsData';
import { analyzeGarmentFit, findBestSize } from '@/lib/fitEngine';

interface FitProfileContextType {
  measurements: BodyMeasurements;
  unit: UnitSystem;
  setUnit: (unit: UnitSystem) => void;
  toggleUnit: () => void;
  updateMeasurement: (key: keyof BodyMeasurements, value: number) => void;
  setAllMeasurements: (newMeasurements: BodyMeasurements) => void;
  resetMeasurements: () => void;
  
  // Garment & Fit Selection
  selectedGarment: Garment;
  setSelectedGarment: (garment: Garment) => void;
  selectedSize: GarmentSizeSpec['size'];
  setSelectedSize: (size: GarmentSizeSpec['size']) => void;
  
  // Modals
  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;
  
  // Dynamic Fit Result
  fitAnalysis: FitAnalysisResult;
  
  // Presets
  applyPreset: (presetName: 'slim' | 'athletic' | 'curvy' | 'tall') => void;
  hasCustomProfile: boolean;
}

const LOCAL_STORAGE_KEY = 'fitprint_body_profile_v1';

const FitProfileContext = createContext<FitProfileContextType | undefined>(undefined);

export function FitProfileProvider({ children }: { children: React.ReactNode }) {
  const [measurements, setMeasurements] = useState<BodyMeasurements>(DEFAULT_MEASUREMENTS);
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [selectedGarment, setSelectedGarment] = useState<Garment>(SAMPLE_GARMENTS[0]);
  const [selectedSize, setSelectedSize] = useState<GarmentSizeSpec['size']>('M');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  const [hasCustomProfile, setHasCustomProfile] = useState<boolean>(false);

  // Load saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setMeasurements(parsed);
          setHasCustomProfile(true);
        }
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
  }, []);

  // Sync to localStorage
  const persistMeasurements = (newMeasurements: BodyMeasurements) => {
    setMeasurements(newMeasurements);
    setHasCustomProfile(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMeasurements));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  };

  const updateMeasurement = (key: keyof BodyMeasurements, value: number) => {
    const updated = { ...measurements, [key]: value };
    persistMeasurements(updated);
  };

  const setAllMeasurements = (newMeasurements: BodyMeasurements) => {
    persistMeasurements(newMeasurements);
  };

  const resetMeasurements = () => {
    persistMeasurements(DEFAULT_MEASUREMENTS);
    setHasCustomProfile(false);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  // Presets logic
  const applyPreset = (presetName: 'slim' | 'athletic' | 'curvy' | 'tall') => {
    let preset: BodyMeasurements = { ...DEFAULT_MEASUREMENTS };
    if (presetName === 'slim') {
      preset = { height: 175, weight: 62, chest: 90, waist: 74, hips: 88, inseam: 80, shoulderWidth: 43, armLength: 63, thigh: 51 };
    } else if (presetName === 'athletic') {
      preset = { height: 182, weight: 84, chest: 106, waist: 82, hips: 98, inseam: 83, shoulderWidth: 49, armLength: 66, thigh: 60 };
    } else if (presetName === 'curvy') {
      preset = { height: 168, weight: 75, chest: 104, waist: 86, hips: 110, inseam: 76, shoulderWidth: 42, armLength: 60, thigh: 62 };
    } else if (presetName === 'tall') {
      preset = { height: 192, weight: 88, chest: 102, waist: 84, hips: 100, inseam: 89, shoulderWidth: 48, armLength: 70, thigh: 58 };
    }
    persistMeasurements(preset);
  };

  // Auto select best size when changing garment
  const handleGarmentChange = (garment: Garment) => {
    setSelectedGarment(garment);
    const best = findBestSize(measurements, garment);
    setSelectedSize(best);
  };

  // Compute fit analysis dynamically
  const fitAnalysis = useMemo(() => {
    return analyzeGarmentFit(measurements, selectedGarment, selectedSize);
  }, [measurements, selectedGarment, selectedSize]);

  return (
    <FitProfileContext.Provider
      value={{
        measurements,
        unit,
        setUnit,
        toggleUnit,
        updateMeasurement,
        setAllMeasurements,
        resetMeasurements,
        selectedGarment,
        setSelectedGarment: handleGarmentChange,
        selectedSize,
        setSelectedSize,
        isScannerOpen,
        setIsScannerOpen,
        isSizeChartOpen,
        setIsSizeChartOpen,
        fitAnalysis,
        applyPreset,
        hasCustomProfile,
      }}
    >
      {children}
    </FitProfileContext.Provider>
  );
}

export function useFitProfile() {
  const context = useContext(FitProfileContext);
  if (!context) {
    throw new Error('useFitProfile must be used within a FitProfileProvider');
  }
  return context;
}
