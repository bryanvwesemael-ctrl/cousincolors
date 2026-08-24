import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Paintbrush } from 'lucide-react';
import { brushClipPath } from '@/lib/brushClip';

gsap.registerPlugin(ScrollTrigger);

interface BrushRevealProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

const HIDDEN_CLIP = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const FULL_CLIP = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

export default function BrushReveal({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className = '',
}: BrushRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);
  const [useFadeFallback, setUseFadeFallback] = useState(false);
  const [fallbackRevealed, setFallbackRevealed] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const beforeLayer = beforeLayerRef.current;
    const brush = brushRef.current;
    if (!container || !beforeLayer) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (prefersReduced) {
      beforeLayer.style.clipPath = HIDDEN_CLIP;
      if (brush) brush.style.opacity = '0';
      return;
    }

    if (isMobile) {
      setUseFadeFallback(true);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setFallbackRevealed(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    beforeLayer.style.clipPath = FULL_CLIP;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6,
        onUpdate: (self) => {
          beforeLayer.style.clipPath = brushClipPath(self.progress);
          if (brush) {
            const edgeX = (1 - self.progress) * 100;
            const edgeOpacity = Math.sin(Math.PI * self.progress);
            brush.style.left = `${edgeX}%`;
            brush.style.opacity = String(Math.max(0, edgeOpacity));
          }
        },
      });
      return () => trigger.kill();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur-sm">
        Na
      </span>

      <div
        ref={beforeLayerRef}
        className={
          useFadeFallback
            ? `absolute inset-0 transition-opacity duration-700 ease-out ${fallbackRevealed ? 'opacity-0' : 'opacity-100'}`
            : 'absolute inset-0'
        }
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur-sm">
          Voor
        </span>
      </div>

      <div
        ref={brushRef}
        className="pointer-events-none absolute inset-y-0 z-20 hidden -translate-x-1/2 items-center opacity-0 lg:flex"
        style={{ left: '100%' }}
      >
        <div className="flex h-12 w-12 -rotate-45 items-center justify-center rounded-full bg-cream-50 shadow-xl ring-1 ring-ink-900/10">
          <Paintbrush size={20} className="text-clay-600" />
        </div>
      </div>
    </div>
  );
}
