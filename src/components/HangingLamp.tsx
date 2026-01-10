import { useEffect, useMemo, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type LampPosition = {
  top: number;
  left: number;
  cordHeight: number;
};

type HangingLampProps = {
  anchorRect: DOMRect | null;
};

const lampSize = 52;
const coneHeight = 420;
const coneWidth = 220;
const lampSpacing = 40; // distance between top icon and lamp bottom edge

const HangingLamp = ({ anchorRect }: HangingLampProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const position: LampPosition | null = useMemo(() => {
    if (!anchorRect) return null;
    const lampBottom = anchorRect.top - lampSpacing;
    const lampTop = lampBottom - lampSize * 0.6;
    const lampLeft = anchorRect.left + anchorRect.width / 2;
    const cordHeight = Math.max(lampTop, 0);

    return {
      top: lampTop,
      left: lampLeft,
      cordHeight,
    };
  }, [anchorRect]);

  if (!position) return null;

  return (
    <div
      className="hidden md:block fixed top-0 left-0 z-30 pointer-events-none"
      style={{
        transformOrigin: 'top center',
        animation: prefersReducedMotion ? 'none' : 'lamp-swing 6s ease-in-out infinite alternate',
      }}
    >
      {/* Cord */}
      <div
        className="absolute"
        style={{
          left: position.left,
          top: 0,
          width: 2,
          height: position.cordHeight,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))',
          transform: 'translateX(-1px)',
        }}
      />

      {/* Shade */}
      <div
        className="absolute"
        style={{
          left: position.left - lampSize / 2 + 1,
          top: position.top,
          width: lampSize,
          height: lampSize * 0.6,
          background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          borderRadius: 6,
        }}
      />

      {/* Bulb glow */}
      <div
        className="absolute rounded-full blur-md"
        style={{
          left: position.left - 10,
          top: position.top - 4,
          width: 18,
          height: 18,
          background: 'radial-gradient(circle, rgba(244,207,79,0.85), rgba(216,178,58,0.25))',
        }}
      />

      {/* Cone */}
      <div
        className="absolute"
        style={{
          left: position.left - coneWidth / 2 + 4,
          top: position.top + lampSize * 0.55,
          width: coneWidth,
          height: coneHeight,
          background: 'radial-gradient(ellipse at 50% -5%, rgba(244,207,79,0.42), rgba(244,207,79,0.14) 55%, transparent 75%)',
          filter: 'blur(1px)',
          opacity: 0.85,
          clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
          animation: prefersReducedMotion ? 'none' : 'lamp-glow 2.8s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};

export default HangingLamp;
