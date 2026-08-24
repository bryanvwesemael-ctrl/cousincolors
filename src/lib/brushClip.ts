const EDGE_POINTS = 9;

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const JITTER = Array.from({ length: EDGE_POINTS + 1 }, (_, i) => pseudoRandom(i + 1) * 2 - 1);

/**
 * Builds a jagged, hand-painted-looking clip-path polygon whose visible width
 * (from the left edge) shrinks from 100% to 0% as `progress` goes 0 -> 1.
 * Pass `1 - progress` to grow the visible width instead of shrinking it.
 */
export function brushClipPath(progress: number, amplitude = 5): string {
  const p = Math.min(1, Math.max(0, progress));
  const edgeBase = (1 - p) * 100;
  const points = ['0% 0%'];
  for (let i = 0; i <= EDGE_POINTS; i++) {
    const y = (i / EDGE_POINTS) * 100;
    const x = Math.min(100, Math.max(0, edgeBase + JITTER[i] * amplitude));
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  points.push('0% 100%');
  return `polygon(${points.join(', ')})`;
}
