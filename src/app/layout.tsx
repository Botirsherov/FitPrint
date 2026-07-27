import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FitProfileProvider } from '@/context/FitProfileContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScannerModal } from '@/components/ScannerModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitPrint - AI Body Measurement & Virtual Fit Comparison Engine',
  description: 'Eliminate fashion returns and material waste. Powered by the SnapMeasure API for 3D body scans, digital body profile tracking, and visual fit heatmaps.',
  keywords: ['SnapMeasure', 'FitPrint', 'Virtual Fitting Room', 'Eco Fashion', 'Fashion Tech', 'Body Measurements', 'Hackathon'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950`} suppressHydrationWarning>
        <FitProfileProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScannerModal />
          </div>
        </FitProfileProvider>
      </body>
    </html>
  );
}
