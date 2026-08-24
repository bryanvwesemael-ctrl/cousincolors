import { useEffect, useRef } from 'react';

const TRAIL = [
  { width: 16, height: 7, color: 'rgba(176, 74, 58, 0.5)', ease: 0.44 },
  { width: 13, height: 5.5, color: 'rgba(176, 74, 58, 0.36)', ease: 0.3 },
  { width: 10, height: 4, color: 'rgba(201, 96, 74, 0.24)', ease: 0.22 },
  { width: 7, height: 2.8, color: 'rgba(201, 96, 74, 0.13)', ease: 0.16 },
];

export default function CustomCursor() {
  const brushRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const angle = useRef(-25);
  const trailPos = useRef(TRAIL.map(() => ({ x: 0, y: 0 })));
  const rafId = useRef<number>();

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    const brush = brushRef.current;
    const trailContainer = trailContainerRef.current;
    if (!brush || !trailContainer) return;

    document.documentElement.classList.add('custom-cursor-active');

    const isInteractive = (el: Element | null) =>
      !!el?.closest('a, button, input, textarea, select, [data-cursor-hover]');

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - target.current.x;
      const dy = e.clientY - target.current.y;
      if (Math.hypot(dx, dy) > 2) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }
      target.current = { x: e.clientX, y: e.clientY };
      brush.style.opacity = '1';
      trailContainer.style.opacity = '1';
    };
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) brush.classList.add('is-hover');
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) brush.classList.remove('is-hover');
    };
    const onDown = () => brush.classList.add('is-down');
    const onUp = () => brush.classList.remove('is-down');
    const onLeave = () => {
      brush.style.opacity = '0';
      trailContainer.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.38;
      pos.current.y += (target.current.y - pos.current.y) * 0.38;
      brush.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-2px, -11px) rotate(${angle.current}deg)`;

      let prev = { x: pos.current.x, y: pos.current.y };
      trailPos.current.forEach((t, i) => {
        t.x += (prev.x - t.x) * TRAIL[i].ease;
        t.y += (prev.y - t.y) * TRAIL[i].ease;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%) rotate(${angle.current + 90}deg)`;
        }
        prev = t;
      });

      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={trailContainerRef}
        className="pointer-events-none fixed inset-0 z-[99] opacity-0 transition-opacity duration-200"
        aria-hidden="true"
      >
        {TRAIL.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 rounded-sm"
            style={{ width: t.width, height: t.height, backgroundColor: t.color }}
          />
        ))}
      </div>

      <div
        ref={brushRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
        style={{ transformOrigin: '2px 11px' }}
        aria-hidden="true"
      >
        <svg
          width="60"
          height="22"
          viewBox="0 0 60 22"
          fill="none"
          className="custom-cursor-brush"
        >
          {/* black rubber grip cap */}
          <rect x="50" y="8" width="8" height="6" rx="3" fill="#1c1917" />
          {/* wooden handle */}
          <rect x="17" y="9" width="34" height="4" rx="2" fill="#dcc9a3" />
          {/* gold ferrule with highlight */}
          <path d="M9 5 L20 8 L20 14 L9 17 Z" fill="#c4a35a" />
          <rect x="12" y="8.5" width="6" height="5" fill="#e6cd85" />
          {/* clay-loaded flat tip */}
          <path d="M0 4 L11 7.5 L11 14.5 L0 18 Z" fill="#b04a3a" />
        </svg>
      </div>
    </>
  );
}
