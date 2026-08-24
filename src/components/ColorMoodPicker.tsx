import { useState } from 'react';

const SWATCHES = [
  { id: 'cream', name: 'Zandwit', hex: '#e0d2b8' },
  { id: 'clay', name: 'Terracotta', hex: '#c9604a' },
  { id: 'sage', name: 'Salie', hex: '#6e7d68' },
  { id: 'ink', name: 'Antraciet', hex: '#3a322c' },
  { id: 'gold', name: 'Oudgoud', hex: '#c4a35a' },
] as const;

export default function ColorMoodPicker() {
  const [active, setActive] = useState<(typeof SWATCHES)[number]>(SWATCHES[0]);

  return (
    <div
      className="rounded-2xl p-6 ring-1 ring-ink-100 transition-colors duration-500"
      style={{ backgroundColor: `${active.hex}1a` }}
    >
      <p className="text-sm font-medium uppercase tracking-wider text-ink-500">
        Kies alvast een sfeer
      </p>
      <p className="mt-2 text-ink-700">
        Nog geen kleur gekozen? Klik wat rond — we denken graag mee tijdens het
        plaatsbezoek.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {SWATCHES.map((swatch) => (
          <button
            key={swatch.id}
            type="button"
            onClick={() => setActive(swatch)}
            aria-label={swatch.name}
            aria-pressed={active.id === swatch.id}
            className={`h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-cream-50 transition-all duration-300 ${
              active.id === swatch.id ? 'scale-110 ring-ink-900' : 'ring-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: swatch.hex }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-ink-600">
        Geselecteerd:{' '}
        <span style={{ color: active.hex }} className="font-semibold">
          {active.name}
        </span>
      </p>
    </div>
  );
}
