import { useReveal } from '@/hooks/useReveal';
import { PROCESS_STEPS } from '@/lib/data';
import CTA from '@/components/CTA';

export default function ProcessSection() {
  const { ref, isVisible } = useReveal();

  return (
    <>
      <section className="section-padding bg-cream-100">
        <div className="container-page">
          <div ref={ref} className={`max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
              Werkwijze
            </p>
            <h2 className="text-display-md font-semibold text-ink-950 text-balance">
              Zo werken we samen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              Van eerste contact tot nette afwerking. Vier heldere stappen, geen verrassingen.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl font-semibold text-clay-300">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-ink-200" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA
        title="Klaar om jouw project te bespreken?"
        subtitle="Vraag een vrijblijvende offerte aan. We komen graag langs om de mogelijkheden te bekijken."
      />
    </>
  );
}
