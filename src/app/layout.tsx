import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FitProfileProvider } from '@/context/FitProfileContext';
import { Footer } from '@/components/Footer';
import { ScannerModal } from '@/components/ScannerModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitPrint | Interactive Fit Demo',
  description: 'Explore interactive, zone-level fit guidance with a sample garment and body profile.',
  keywords: ['FitPrint', 'Interactive Fit Demo', 'Zone-Level Fit Guidance', 'Apparel Fit'],
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
            <main className="flex-1">{children}</main>
            <Footer />
            <ScannerModal />
          </div>
        </FitProfileProvider>
      </body>
    </html>
  );
}
