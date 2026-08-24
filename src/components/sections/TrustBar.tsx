import { HandHeart, Sparkles, ClipboardCheck, Home } from 'lucide-react';
import { TRUST_POINTS, SERVICES, COMPANY } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';
import CountUp from '@/components/CountUp';

const ICONS = [HandHeart, Sparkles, ClipboardCheck, Home];

const STATS = [
  { target: SERVICES.length, prefix: '', suffix: '', label: 'Specialisaties' },
  { target: COMPANY.regionCities.length, prefix: '', suffix: '', label: "Regio's bediend" },
  { target: 20, prefix: '€', suffix: '/m²', label: 'Indicatieve prijs vanaf' },
];

export default function TrustBar() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="bg-cream-100 py-16 lg:py-20">
      <div className="container-page">
        <div ref={ref} className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-display-md font-semibold text-ink-950 text-balance">
            Vakmanschap. Persoonlijk contact. Een nette afwerking.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-display-md font-display font-semibold text-clay-600">
                  <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-sm text-ink-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={index}
                className={`paint-hover rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-950">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
