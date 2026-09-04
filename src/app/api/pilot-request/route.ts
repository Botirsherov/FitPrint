import { NextResponse } from 'next/server';

type PilotRequest = {
  name: string;
  email: string;
  brand: string;
  storeUrl?: string;
  platform: string;
  category: string;
  productCount?: string;
  challenge: string;
  timeline: string;
  website?: string;
};

const MAX_LENGTHS: Record<string, number> = {
  name: 100,
  email: 160,
  brand: 120,
  storeUrl: 240,
  platform: 80,
  category: 120,
  productCount: 40,
  challenge: 1000,
  timeline: 80,
};

function clean(value: unknown, field: string): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_LENGTHS[field] ?? 200);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  const sharedSecret = process.env.GOOGLE_APPS_SCRIPT_SHARED_SECRET;

  if (!webhookUrl || !sharedSecret) {
    return NextResponse.json(
      { success: false, message: 'Pilot requests are not configured yet.' },
      { status: 503 }
    );
  }

  try {
    const raw = (await request.json()) as Partial<PilotRequest>;
    const payload: PilotRequest = {
      name: clean(raw.name, 'name'),
      email: clean(raw.email, 'email'),
      brand: clean(raw.brand, 'brand'),
      storeUrl: clean(raw.storeUrl, 'storeUrl'),
      platform: clean(raw.platform, 'platform'),
      category: clean(raw.category, 'category'),
      productCount: clean(raw.productCount, 'productCount'),
      challenge: clean(raw.challenge, 'challenge'),
      timeline: clean(raw.timeline, 'timeline'),
      website: clean(raw.website, 'website'),
    };

    if (payload.website) {
      return NextResponse.json({ success: true });
    }

    if (!payload.name || !payload.email || !payload.brand || !payload.category || !payload.challenge) {
      return NextResponse.json(
        { success: false, message: 'Please complete the required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid work email.' },
        { status: 400 }
      );
    }

    if (!isValidUrl(payload.storeUrl ?? '')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid store URL.' },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-FitPrint-Secret': sharedSecret,
      },
      body: JSON.stringify({
        ...payload,
        secret: sharedSecret,
        submittedAt: new Date().toISOString(),
        source: 'fitprint-website',
      }),
      cache: 'no-store',
    });

    const webhookResult = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

    if (!response.ok || !webhookResult?.success) {
      console.error('[API Route /api/pilot-request] Webhook rejected request:', response.status, webhookResult?.message);
      return NextResponse.json(
        { success: false, message: 'We could not submit your request. Please try again shortly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[API Route /api/pilot-request] Unexpected server error:', error);
    return NextResponse.json(
      { success: false, message: 'We could not submit your request. Please try again shortly.' },
      { status: 500 }
    );
  }
}
