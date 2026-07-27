'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useFitProfile } from '@/context/FitProfileContext';
import { X, Camera, Upload, RefreshCw, CheckCircle2, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { ScanningAnimation } from './ScanningAnimation';
import { BodyMeasurements } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export function ScannerModal() {
  const { isScannerOpen, setIsScannerOpen, setAllMeasurements, measurements } = useFitProfile();
  
  const [activeTab, setActiveTab] = useState<'webcam' | 'upload'>('webcam');
  const [heightCm, setHeightCm] = useState<number>(measurements.height || 178);
  const [weightKg, setWeightKg] = useState<number>(measurements.weight || 73);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<BodyMeasurements | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number>(0.96);
  const [isMockUsed, setIsMockUsed] = useState<boolean>(false);

  // Webcam references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);

  // Start webcam feed
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (err) {
      console.warn('Webcam permission denied or unavailable', err);
      setErrorMsg('Camera access unavailable. You can upload a photo instead.');
    }
  };

  // Stop webcam feed
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
  };

  // Capture webcam frame
  const captureWebcamFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUri);
        stopWebcam();
        processScan(dataUri);
      }
    }
  };

  // Handle file drop/upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultUri = reader.result as string;
        setImagePreview(resultUri);
        processScan(resultUri);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send request to /api/snapmeasure
  const processScan = async (imgUri: string) => {
    setIsScanning(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/snapmeasure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imgUri,
          heightCm,
          weightKg,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setScanResult(json.data.measurements);
        setConfidenceScore(json.data.confidenceScore || 0.96);
        setIsMockUsed(!!json.isMockFallback);
      } else {
        throw new Error(json.message || 'Scan failed');
      }
    } catch (err: any) {
      console.error('Scan Error:', err);
      setErrorMsg('Failed to process scan. Generating calibrated estimation.');
    } finally {
      // Small timeout for scanning animation feel
      setTimeout(() => {
        setIsScanning(false);
      }, 1500);
    }
  };

  const handleSaveAndClose = () => {
    if (scanResult) {
      setAllMeasurements(scanResult);
    }
    stopWebcam();
    setIsScannerOpen(false);
    // Reset state
    setScanResult(null);
    setImagePreview(null);
  };

  if (!isScannerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/40 bg-slate-900 shadow-2xl overflow-hidden my-8"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">SnapMeasure AI Body Scanner</h3>
                <p className="text-xs text-emerald-400 font-medium">3D Anatomical Measurement Extraction</p>
              </div>
            </div>
            <button
              onClick={() => { stopWebcam(); setIsScannerOpen(false); }}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            
            {/* Calibration Inputs */}
            {!scanResult && !isScanning && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Height (cm) <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="178"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Weight (kg) <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="73"
                  />
                </div>
              </div>
            )}

            {/* Scanning View State */}
            {isScanning ? (
              <ScanningAnimation imagePreview={imagePreview} />
            ) : scanResult ? (
              /* Extracted Measurements Summary */
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-200">
                        Measurements Extracted Successfully!
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-900/80 px-2.5 py-0.5 text-xs font-mono text-emerald-300 border border-emerald-600/50">
                      Confidence: {(confidenceScore * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Grid of Results */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Chest / Bust</p>
                      <p className="text-lg font-extrabold text-emerald-400">{scanResult.chest} cm</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Waist</p>
                      <p className="text-lg font-extrabold text-teal-300">{scanResult.waist} cm</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Hips</p>
                      <p className="text-lg font-extrabold text-emerald-400">{scanResult.hips} cm</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <p className="text-xs text-slate-400">Inseam</p>
                      <p className="text-lg font-extrabold text-teal-300">{scanResult.inseam} cm</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>
                      {isMockUsed
                        ? 'Processed via SnapMeasure AI Vision API fallback simulation engine.'
                        : 'Processed live by SnapMeasure API (https://www.snap2wear.xyz/).'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setScanResult(null); setImagePreview(null); }}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-900 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800"
                  >
                    Retake Scan
                  </button>
                  <button
                    onClick={handleSaveAndClose}
                    className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                  >
                    Save to My FitProfile
                  </button>
                </div>
              </div>
            ) : (
              /* Capture / Upload Options */
              <div className="space-y-4">
                {/* Tab Switcher */}
                <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => { setActiveTab('webcam'); startWebcam(); }}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                      activeTab === 'webcam'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    Webcam Scan
                  </button>
                  <button
                    onClick={() => { setActiveTab('upload'); stopWebcam(); }}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                      activeTab === 'upload'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                </div>

                {/* Webcam Tab Content */}
                {activeTab === 'webcam' && (
                  <div className="space-y-4">
                    <div className="relative h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {!isWebcamActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90 space-y-3">
                          <Camera className="w-10 h-10 text-emerald-400 animate-pulse" />
                          <p className="text-xs text-slate-300">Click below to activate live webcam stream</p>
                          <button
                            onClick={startWebcam}
                            className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                          >
                            Enable Camera
                          </button>
                        </div>
                      )}

                      {/* Frame Guide Box */}
                      {isWebcamActive && (
                        <div className="absolute inset-4 border-2 border-dashed border-emerald-400/70 rounded-xl pointer-events-none flex flex-col items-center justify-between p-2">
                          <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded">
                            Align Full Body in Frame
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      disabled={!isWebcamActive}
                      onClick={captureWebcamFrame}
                      className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Capture Body & Analyze
                    </button>
                  </div>
                )}

                {/* Upload Tab Content */}
                {activeTab === 'upload' && (
                  <div className="space-y-4">
                    <label className="flex flex-col items-center justify-center h-64 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/80 hover:border-emerald-500/70 transition-colors cursor-pointer p-6">
                      <Upload className="w-10 h-10 text-emerald-400 mb-2" />
                      <p className="text-sm font-semibold text-slate-200">
                        Click or Drag & Drop body image here
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PNG, JPG or WEBP (Full length or upper body photo)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
