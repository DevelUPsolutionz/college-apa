import { useEffect, useRef, useState } from 'react';

interface TransparentLogoVideoProps {
  className?: string;
}

/**
 * Renders the College APA intro video on a canvas with real-time luma-key
 * background removal so the white studio background becomes transparent.
 * Falls back to the transparent PNG logo if video playback is unavailable.
 */
export function TransparentLogoVideo({ className = '' }: TransparentLogoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let rafId = 0;

    const renderFrame = () => {
      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const minC = Math.min(r, g, b);
          const maxC = Math.max(r, g, b);
          const saturation = maxC - minC;

          // Remove near-white / light-neutral studio background while preserving navy & gold
          if (minC > 210 && saturation < 38) {
            const fade = Math.max(0, (242 - minC) / 32);
            data[i + 3] = Math.round(data[i + 3] * fade * 0.25);
          } else if (minC > 185 && saturation < 24) {
            const fade = Math.max(0, (215 - minC) / 30);
            data[i + 3] = Math.round(data[i + 3] * fade);
          }
        }

        ctx.putImageData(frame, 0, 0);
        if (!videoReady) setVideoReady(true);
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    const startPlayback = () => {
      video.play().catch(() => {
        // Autoplay may be blocked on some devices; fallback PNG remains visible
      });
      rafId = requestAnimationFrame(renderFrame);
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('canplay', startPlayback);
    };
  }, [videoReady]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <video
        ref={videoRef}
        src="/college-apa-intro.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-contain transition-opacity duration-300 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="College APA Animated Emblem"
      />
      {!videoReady && (
        <img
          src="/college-apa-logo.png"
          alt="College APA Logo"
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}

