import { useEffect, useRef } from 'react';

const TRAIL = [
  { size: 9, color: 'rgba(176, 74, 58, 0.55)', ease: 0.32 },
  { size: 7, color: 'rgba(176, 74, 58, 0.4)', ease: 0.24 },
  { size: 6, color: 'rgba(201, 96, 74, 0.3)', ease: 0.18 },
  { size: 4, color: 'rgba(201, 96, 74, 0.18)', ease: 0.14 },
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
      brush.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translateY(-8px) rotate(${angle.current}deg)`;

      let prev = { x: pos.current.x, y: pos.current.y };
      trailPos.current.forEach((t, i) => {
        t.x += (prev.x - t.x) * TRAIL[i].ease;
        t.y += (prev.y - t.y) * TRAIL[i].ease;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%)`;
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
            className="absolute left-0 top-0 rounded-full"
            style={{ width: t.size, height: t.size, backgroundColor: t.color }}
          />
        ))}
      </div>

      <div
        ref={brushRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
        style={{ transformOrigin: '0px 8px' }}
        aria-hidden="true"
      >
        <svg
          width="46"
          height="16"
          viewBox="0 0 46 16"
          fill="none"
          className="custom-cursor-brush"
        >
          <rect x="12" y="6.5" width="32" height="3" rx="1.5" fill="#483f36" />
          <rect x="7" y="4.5" width="7" height="7" rx="1" fill="#e9e6e2" />
          <rect x="0" y="2" width="9" height="12" rx="1.5" fill="#b04a3a" />
          <rect x="2.5" y="2" width="1" height="12" fill="#8f3a30" opacity="0.55" />
          <rect x="5.5" y="2" width="1" height="12" fill="#8f3a30" opacity="0.55" />
        </svg>
      </div>
    </>
  );
}
