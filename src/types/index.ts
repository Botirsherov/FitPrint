export type UnitSystem = 'metric' | 'imperial'; // cm/kg vs in/lbs

export interface BodyMeasurements {
  height: number; // cm
  weight?: number; // kg
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
  inseam: number; // cm
  shoulderWidth: number; // cm
  armLength: number; // cm
  thigh: number; // cm
  neck?: number; // cm
}

export type FitStatus = 'perfect' | 'slightly_loose' | 'slightly_tight' | 'too_tight' | 'too_loose';

export interface ZoneFitDetail {
  zoneName: string; // Chest, Waist, Hips, Inseam, Shoulders, etc.
  userValCm: number;
  garmentValCm: number;
  differenceCm: number; // positive = loose, negative = tight
  status: FitStatus;
  score: number; // 0 - 100
  feedback: string;
}

export interface GarmentSizeSpec {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
  inseam: number; // cm
  shoulderWidth: number; // cm
  sleeveLength?: number; // cm
}

export interface Garment {
  id: string;
  name: string;
  brand: string;
  category: 'jeans' | 'hoodie' | 'blazer' | 'tshirt' | 'dress' | 'jacket';
  imageUrl: string;
  price: string;
  description: string;
  fitType: 'regular' | 'slim' | 'oversized' | 'relaxed';
  material: string;
  sizes: GarmentSizeSpec[];
  productUrl?: string;
}

export interface EcoImpactResult {
  co2SavedKg: number; // kg CO2e
  waterSavedLiters: number; // Liters
  cardboardSavedKg: number; // kg packaging
  returnsAvoidedCount: number;
}

export interface FitAnalysisResult {
  garmentId: string;
  selectedSize: GarmentSizeSpec['size'];
  overallScore: number; // 0 - 100
  bestMatchingSize: GarmentSizeSpec['size'];
  recommendationTitle: string;
  recommendationSummary: string;
  zoneDetails: ZoneFitDetail[];
  ecoImpact: EcoImpactResult;
}

export interface SnapMeasureApiResponse {
  success: boolean;
  message?: string;
  data?: {
    measurements: BodyMeasurements;
    confidenceScore: number;
    detectedKeypointsCount: number;
    scanTimestamp: string;
  };
  isMockFallback?: boolean;
}
