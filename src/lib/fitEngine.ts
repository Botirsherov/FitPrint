import { BodyMeasurements, Garment, GarmentSizeSpec, FitAnalysisResult, ZoneFitDetail, FitStatus, EcoImpactResult } from '@/types';

/**
 * Calculates raw score and zone details for a given size spec without recursion.
 */
function evaluateGarmentSizeSpec(user: BodyMeasurements, garment: Garment, sizeSpec: GarmentSizeSpec) {
  const zoneDetails: ZoneFitDetail[] = [];

  const isPants = garment.category === 'jeans';
  const isTop = garment.category === 'hoodie' || garment.category === 'blazer' || garment.category === 'tshirt' || garment.category === 'jacket';
  const isDress = garment.category === 'dress';

  // Chest evaluation
  if (isTop || isDress) {
    if (sizeSpec.chest > 0) {
      zoneDetails.push(evaluateZone('Chest / Bust', user.chest, sizeSpec.chest, garment.fitType));
    }
  }

  // Waist evaluation
  if (sizeSpec.waist > 0) {
    zoneDetails.push(evaluateZone('Waist', user.waist, sizeSpec.waist, isPants ? 'slim' : garment.fitType));
  }

  // Hips evaluation
  if (sizeSpec.hips > 0) {
    zoneDetails.push(evaluateZone('Hips', user.hips, sizeSpec.hips, garment.fitType));
  }

  // Shoulder evaluation
  if ((isTop || isDress) && sizeSpec.shoulderWidth > 0 && user.shoulderWidth > 0) {
    zoneDetails.push(evaluateZone('Shoulder Width', user.shoulderWidth, sizeSpec.shoulderWidth, garment.fitType));
  }

  // Inseam evaluation (for pants)
  if (isPants && sizeSpec.inseam > 0 && user.inseam > 0) {
    zoneDetails.push(evaluateZone('Inseam Length', user.inseam, sizeSpec.inseam, 'regular'));
  }

  const totalScore = zoneDetails.reduce((sum, zone) => sum + zone.score, 0);
  const overallScore = zoneDetails.length > 0 ? Math.round(totalScore / zoneDetails.length) : 85;

  return { overallScore, zoneDetails };
}

/**
 * Calculates how well a specific garment size fits the user's body measurements.
 */
export function analyzeGarmentFit(
  user: BodyMeasurements,
  garment: Garment,
  targetSize: GarmentSizeSpec['size']
): FitAnalysisResult {
  const sizeSpec = garment.sizes.find((s) => s.size === targetSize) || garment.sizes[0];
  const { overallScore, zoneDetails } = evaluateGarmentSizeSpec(user, garment, sizeSpec);

  // Find best matching size across all sizes
  const bestMatchingSize = findBestSize(user, garment);

  // Generate recommendation summary
  const recommendationTitle = `Size ${targetSize} is your ${getFitTitle(overallScore)}`;
  let recommendationSummary = '';

  if (targetSize === bestMatchingSize) {
    recommendationSummary = `Great choice! Size ${targetSize} perfectly matches your body proportions with optimal comfort in critical zones.`;
  } else {
    recommendationSummary = `Size ${targetSize} will work, but our AI algorithm recommends Size ${bestMatchingSize} for a superior overall contour.`;
  }

  // Calculate environmental return savings
  const ecoImpact = calculateEcoSavings(overallScore);

  return {
    garmentId: garment.id,
    selectedSize: targetSize,
    overallScore,
    bestMatchingSize,
    recommendationTitle,
    recommendationSummary,
    zoneDetails,
    ecoImpact,
  };
}

/**
 * Evaluates a single body zone against garment dimensions.
 */
function evaluateZone(
  zoneName: string,
  userCm: number,
  garmentCm: number,
  fitType: Garment['fitType']
): ZoneFitDetail {
  let easeAllowance = 4; // cm of ease for regular fit
  if (fitType === 'slim') easeAllowance = 2;
  if (fitType === 'oversized') easeAllowance = 8;
  if (fitType === 'relaxed') easeAllowance = 6;

  const diffCm = garmentCm - userCm;
  const netEase = diffCm - easeAllowance;

  let status: FitStatus = 'perfect';
  let score = 100;
  let feedback = '';

  if (netEase >= -1 && netEase <= 4) {
    status = 'perfect';
    score = Math.max(90, 100 - Math.abs(netEase) * 2.5);
    feedback = `Ideal ${fitType} drape and proportion.`;
  } else if (netEase > 4 && netEase <= 9) {
    status = 'slightly_loose';
    score = Math.max(75, 90 - (netEase - 4) * 3);
    feedback = `Slightly relaxed (+${Math.round(netEase)}cm extra room).`;
  } else if (netEase > 9) {
    status = 'too_loose';
    score = Math.max(50, 75 - (netEase - 9) * 4);
    feedback = `Noticeably loose/baggy (+${Math.round(netEase)}cm over standard ease).`;
  } else if (netEase < -1 && netEase >= -5) {
    status = 'slightly_tight';
    score = Math.max(70, 90 - Math.abs(netEase + 1) * 4);
    feedback = `Snug fit (${Math.abs(Math.round(netEase))}cm tighter than standard).`;
  } else {
    status = 'too_tight';
    score = Math.max(35, 70 - Math.abs(netEase + 5) * 5);
    feedback = `Restricted movement (${Math.abs(Math.round(netEase))}cm tight). Consider sizing up.`;
  }

  return {
    zoneName,
    userValCm: userCm,
    garmentValCm: garmentCm,
    differenceCm: Math.round(diffCm * 10) / 10,
    status,
    score: Math.round(score),
    feedback,
  };
}

/**
 * Iterates over all garment sizes to select the highest scoring size (without recursion).
 */
export function findBestSize(user: BodyMeasurements, garment: Garment): GarmentSizeSpec['size'] {
  let bestSize = garment.sizes[0].size;
  let highestScore = -1;

  garment.sizes.forEach((s) => {
    const { overallScore } = evaluateGarmentSizeSpec(user, garment, s);
    if (overallScore > highestScore) {
      highestScore = overallScore;
      bestSize = s.size;
    }
  });

  return bestSize;
}

function getFitTitle(score: number): string {
  if (score >= 90) return 'Optimal Fit! (90-100%)';
  if (score >= 80) return 'Recommended Fit (80-89%)';
  if (score >= 65) return 'Moderate Fit (65-79%)';
  return 'Sub-optimal Fit (<65%)';
}

function calculateEcoSavings(score: number): EcoImpactResult {
  const isReturnAvoided = score >= 75;
  const co2Factor = isReturnAvoided ? 2.5 : 0.4;
  const waterFactor = isReturnAvoided ? 14.2 : 2.0;
  const packagingFactor = isReturnAvoided ? 0.35 : 0.05;

  return {
    co2SavedKg: Math.round(co2Factor * 10) / 10,
    waterSavedLiters: Math.round(waterFactor * 10) / 10,
    cardboardSavedKg: Math.round(packagingFactor * 100) / 100,
    returnsAvoidedCount: isReturnAvoided ? 1 : 0,
  };
}

export function cmToInches(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}
