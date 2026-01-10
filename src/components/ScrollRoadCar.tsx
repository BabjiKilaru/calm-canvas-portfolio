import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type Puff = { id: number; x: number; created: number };

const ROAD_WIDTH = 30;
const ROAD_RADIUS = 12;
const ROAD_PADDING = 14;
const CAR_HEIGHT = 28;
const CAR_WIDTH = 24;
const MAX_PUFFS = 6;
const PUFF_LIFETIME = 900; // ms

const ScrollRoadCar = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lineOffset, setLineOffset] = useState(0);
  const [puffs, setPuffs] = useState<Puff[]>([]);

  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const velocityRef = useRef(0);
  const smoothVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const puffId = useRef(0);

  const updateContainerHeight = () => {
    if (!containerRef.current) return;
    setContainerHeight(containerRef.current.getBoundingClientRect().height);
  };

  useLayoutEffect(() => {
    updateContainerHeight();
    const resizeObserver = new ResizeObserver(updateContainerHeight);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', updateContainerHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const clamped = Math.min(Math.max(raw, 0), 1);
      targetProgress.current = clamped;

      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      velocityRef.current = delta;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let raf: number;

    const tick = () => {
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.15;
      smoothVelocity.current += (velocityRef.current - smoothVelocity.current) * 0.15;

      const nextProgress = smoothProgress.current;
      const vel = smoothVelocity.current;

      setProgress(nextProgress);

      if (!prefersReducedMotion) {
        setLineOffset((prev) => prev + vel * 0.5);

        if (Math.abs(vel) > 0.5) {
          setPuffs((prev) => {
            const now = performance.now();
            const next = prev.filter((p) => now - p.created < PUFF_LIFETIME);
            next.push({ id: puffId.current++, x: -6 + Math.random() * 12, created: now });
            return next.slice(-MAX_PUFFS);
          });
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  const carY = useMemo(() => {
    const usable = Math.max(containerHeight - CAR_HEIGHT - ROAD_PADDING * 2, 0);
    return ROAD_PADDING + usable * progress;
  }, [containerHeight, progress]);

  const roadStyle = useMemo(
    () => ({
      width: ROAD_WIDTH,
      borderRadius: ROAD_RADIUS,
      backgroundImage:
        'repeating-linear-gradient(0deg, transparent 0 12px, rgba(255,255,255,0.6) 12px 18px, transparent 18px 30px)',
      backgroundPositionY: prefersReducedMotion ? '0px' : `${lineOffset}px`,
    }),
    [lineOffset, prefersReducedMotion],
  );

  const now = performance.now();
  const visiblePuffs = puffs.filter((p) => now - p.created < PUFF_LIFETIME);

  return (
    <div className="hidden md:flex fixed top-20 bottom-20 right-2 lg:right-4 z-20 pointer-events-none">
      <div
        ref={containerRef}
        className="relative h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg overflow-hidden"
        style={roadStyle}
      >
        {/* Car */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ transform: `translate(-50%, ${carY}px)` }}
        >
          <div className="h-[10px] w-[18px] bg-slate-200 rounded-[5px] shadow" />
          <div className="relative mt-[-4px] h-[14px] w-[22px] bg-slate-100 rounded-[7px] shadow flex items-center justify-between px-1">
            <div className="h-[7px] w-[7px] bg-slate-700 rounded-full shadow-inner" />
            <div className="h-[7px] w-[7px] bg-slate-700 rounded-full shadow-inner" />
          </div>
        </div>

        {/* Smoke */}
        {!prefersReducedMotion &&
          visiblePuffs.map((puff) => {
            const age = now - puff.created;
            const life = age / PUFF_LIFETIME;
            const opacity = 0.35 * (1 - life);
            const scale = 0.7 + 0.4 * (1 - life);
            const puffY = carY + CAR_HEIGHT / 2 + age * 0.04;
            return (
              <div
                key={puff.id}
                className="absolute rounded-full bg-slate-200/70 blur-[1px]"
                style={{
                  left: `calc(50% - 8px + ${puff.x}px)`,
                  top: puffY,
                  width: 10,
                  height: 10,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              />
            );
          })}

        {/* Edge fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60 pointer-events-none" />
      </div>
    </div>
  );
};

export default ScrollRoadCar;
