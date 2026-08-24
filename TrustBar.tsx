import { HandHeart, Sparkles, ClipboardCheck, Home } from 'lucide-react';
import { TRUST_POINTS } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

const ICONS = [HandHeart, Sparkles, ClipboardCheck, Home];

export default function TrustBar() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="bg-cream-100 py-16 lg:py-20">
      <div className="container-page">
        <div ref={ref} className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-display-md font-semibold text-ink-950 text-balance">
            Vakmanschap. Persoonlijk contact. Een nette afwerking.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={index}
                className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
