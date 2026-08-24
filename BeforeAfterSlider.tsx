import { useCallback, useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updatePosition(e.touches[0].clientX);
    };
    const stop = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stop);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-2xl select-none"
      onMouseDown={(e) => {
        setIsDragging(true);
        updatePosition(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        if (e.touches.length > 0) updatePosition(e.touches[0].clientX);
      }}
    >
      {/* After image (full width, bottom layer) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="lazy"
      />
      <span className="absolute right-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur-sm">
        Na
      </span>

      {/* Before image (clipped to left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${containerRef.current?.clientWidth ?? 100}%`, maxWidth: 'none' }}
          draggable={false}
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur-sm">
          Voor
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute inset-y-0 z-10 flex items-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-cream-50 shadow-lg" />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cream-50 shadow-xl ring-1 ring-ink-900/10">
          <MoveHorizontal size={18} className="text-ink-900" />
        </div>
      </div>
    </div>
  );
}
