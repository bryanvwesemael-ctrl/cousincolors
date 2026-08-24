import { Link } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Cousin Colors — Home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 text-cream-50">
        <span className="font-display text-lg font-bold leading-none">CC</span>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-ink-950">
        Cousin Colors
      </span>
    </Link>
  );
}
