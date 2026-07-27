import { NextResponse } from 'next/server';
import { sendSnapMeasureScan } from '@/lib/snapmeasure';

/**
 * Next.js Server Route Handler for SnapMeasure API Integration
 * POST /api/snapmeasure
 * 
 * Securely wraps requests to https://www.snap2wear.xyz/ using server-side API keys.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, heightCm = 178, weightKg = 73 } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image payload (base64 or data URI) is required.' },
        { status: 400 }
      );
    }

    // Call SnapMeasure service helper
    const result = await sendSnapMeasureScan(image, Number(heightCm), Number(weightKg));

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API Route /api/snapmeasure] Unexpected server error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process body measurement scan.',
        error: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}
