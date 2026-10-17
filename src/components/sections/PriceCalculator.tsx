import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, PRICE_EXAMPLES, PRICE_FINISHES, PRICE_REPAIR_FACTOR } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const euro = new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function roundTo10(n: number) {
  return Math.round(n / 10) * 10;
}

function useTweenedNumber(value: number, duration = 450) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = from + (value - from) * eased;
      setDisplay(current);
      fromRef.current = current;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

export default function PriceCalculator() {
  const { ref, isVisible } = useReveal();
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);
  const [area, setArea] = useState(30);
  const [areaTouched, setAreaTouched] = useState(false);
  const [finishId, setFinishId] = useState<string | null>(null);
  const [repair, setRepair] = useState(false);

  const service = SERVICES.find((s) => s.slug === serviceSlug) ?? null;
  const finish = PRICE_FINISHES.find((f) => f.id === finishId) ?? null;
  const rate = serviceSlug ? PRICE_EXAMPLES[serviceSlug] : null;

  const answered = [!!service, areaTouched, !!finish].filter(Boolean).length;
  const progress = answered / 3;
  const complete = answered === 3;

  const factor = (finish?.factor ?? 1) * (repair ? PRICE_REPAIR_FACTOR : 1);
  const min = rate ? roundTo10(rate.min * area * factor) : 0;
  const max = rate ? roundTo10(rate.max * area * factor) : 0;

  const shownMin = useTweenedNumber(min);
  const shownMax = useTweenedNumber(max);
  const shownProgress = useTweenedNumber(Math.round(progress * 100), 600);

  const summary = service
    ? `Richtprijs-calculator: ${service.title}, ±${area} m², afwerking ${finish?.label.toLowerCase() ?? 'nog te kiezen'}${
        repair ? ', herstelwerk nodig' : ''
      }. Indicatie (voorbeeldprijzen): ${euro.format(min)} – ${euro.format(max)}.`
    : '';

  return (
    <section id="prijs" className="section-padding bg-cream-100">
      <div className="container-page">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">Richtprijs</p>
          <h2 className="text-display-md font-semibold text-ink-950 text-balance">
            Je prijsindicatie in 30 seconden
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Drie vragen, en je ziet meteen in welke prijsklasse je project valt. Daarna vragen
            we een exacte offerte op maat.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12">
          {/* Questions */}
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                <StepDot done={!!service} n={1} /> Wat wil je laten doen?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setServiceSlug(s.slug)}
                    aria-pressed={serviceSlug === s.slug}
                    className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                      serviceSlug === s.slug
                        ? 'border-clay-600 bg-clay-50 text-clay-700 ring-1 ring-clay-600'
                        : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                <StepDot done={areaTouched} n={2} /> Hoeveel m² ongeveer?
              </legend>
              <div className="rounded-xl border border-ink-200 bg-white px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="area" className="text-sm text-ink-600">
                    Oppervlakte
                  </label>
                  <span className="font-display text-2xl font-semibold tabular-nums text-ink-950">
                    {area} m²
                  </span>
                </div>
                <input
                  id="area"
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={area}
                  onChange={(e) => {
                    setArea(Number(e.target.value));
                    setAreaTouched(true);
                  }}
                  className="price-range mt-3 w-full"
                  style={{ ['--fill' as string]: `${((area - 5) / 245) * 100}%` }}
                />
                <p className="mt-2 text-xs text-ink-400">
                  Tip: een kamer van 4 × 4 m heeft ongeveer 45 m² muren en plafond.
                </p>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                <StepDot done={!!finish} n={3} /> Welke afwerking?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {PRICE_FINISHES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinishId(f.id)}
                    aria-pressed={finishId === f.id}
                    className={`rounded-xl border px-4 py-3.5 text-left transition-all ${
                      finishId === f.id
                        ? 'border-clay-600 bg-clay-50 ring-1 ring-clay-600'
                        : 'border-ink-200 bg-white hover:border-ink-300'
                    }`}
                  >
                    <span className={`block text-sm font-medium ${finishId === f.id ? 'text-clay-700' : 'text-ink-800'}`}>
                      {f.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-500">{f.hint}</span>
                  </button>
                ))}
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={repair}
                  onChange={(e) => setRepair(e.target.checked)}
                  className="h-4 w-4 rounded border-ink-300 accent-clay-600"
                />
                Er zijn scheuren of gaten die eerst hersteld moeten worden
              </label>
            </fieldset>
          </div>

          {/* Result */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-ink-950 p-7 text-cream-50 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
                <div className="relative h-[120px] w-[120px] flex-shrink-0">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="currentColor" strokeWidth="8" className="text-cream-50/10" />
                    <circle
                      cx="60"
                      cy="60"
                      r={RING_RADIUS}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="text-clay-400 transition-[stroke-dashoffset] duration-700 ease-out"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                    />
                  </svg>
                  <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-semibold tabular-nums">{Math.round(shownProgress)}%</span>
                    <span className="text-[11px] uppercase tracking-wider text-cream-200/60">klaar</span>
                  </div>
                </div>
                <div>
                  <p className="sr-only" aria-live="polite" data-price-result>
                    {service ? `Indicatie ${euro.format(min)} tot ${euro.format(max)}, excl. btw` : ''}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-cream-200/60">Indicatie</p>
                  {service ? (
                    <p aria-hidden="true" className="mt-1 whitespace-nowrap font-display text-[1.6rem] font-semibold leading-tight tabular-nums sm:text-3xl">
                      {euro.format(roundTo10(shownMin))}
                      <span className="text-cream-200/50"> – </span>
                      {euro.format(roundTo10(shownMax))}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-cream-200/70">Kies eerst een dienst.</p>
                  )}
                  <p className="mt-1 text-xs text-cream-200/60">excl. btw · voorbeeldprijzen</p>
                </div>
              </div>

              <ul className="mt-6 space-y-2 border-t border-cream-50/10 pt-5 text-sm text-cream-200/80">
                <li>{service ? service.title : 'Dienst nog niet gekozen'}</li>
                <li>{areaTouched ? `±${area} m²` : 'Oppervlakte nog niet ingesteld'}</li>
                <li>
                  {finish ? `${finish.label} afwerking` : 'Afwerking nog niet gekozen'}
                  {repair && ' · met herstelwerk'}
                </li>
              </ul>

              {complete ? (
                <Link
                  to="/offerte"
                  state={{ serviceType: service?.title, projectDescription: summary }}
                  className="btn-primary mt-7 w-full"
                >
                  Vraag je exacte offerte aan
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <p className="mt-7 rounded-full border border-cream-50/15 px-5 py-3 text-center text-sm text-cream-200/70">
                  Beantwoord nog {3 - answered} {3 - answered === 1 ? 'vraag' : 'vragen'}
                </p>
              )}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-500">
              Dit is een vrijblijvende indicatie. De exacte prijs hangt af van de staat van de
              ondergrond en bespreken we na een plaatsbezoek.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepDot({ done, n }: { done: boolean; n: number }) {
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
        done ? 'bg-clay-600 text-cream-50' : 'bg-white text-ink-500 ring-1 ring-ink-200'
      }`}
    >
      {done ? <Check size={13} /> : n}
    </span>
  );
}
