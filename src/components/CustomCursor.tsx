import { useEffect, useRef } from 'react';
import { Paintbrush } from 'lucide-react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add('custom-cursor-active');

    const isInteractive = (el: Element | null) =>
      !!el?.closest('a, button, input, textarea, select, [data-cursor-hover]');

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      cursor.style.opacity = '1';
    };
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) cursor.classList.add('is-hover');
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) cursor.classList.remove('is-hover');
    };
    const onDown = () => cursor.classList.add('is-down');
    const onUp = () => cursor.classList.remove('is-down');
    const onLeave = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
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
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
      aria-hidden="true"
    >
      <div className="custom-cursor-dot flex h-9 w-9 items-center justify-center rounded-full bg-cream-50 shadow-lg ring-1 ring-ink-900/10">
        <Paintbrush size={16} className="text-clay-600" />
      </div>
    </div>
  );
}
