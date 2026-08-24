import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function AboutPreview() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-2xl bg-cream-200">
              <div className="flex h-full w-full items-center justify-center text-center">
                <div className="px-6">
                  <p className="font-display text-5xl font-semibold text-ink-300">CC</p>
                  <p className="mt-3 text-sm text-ink-400">
                    Hier komt binnenkort een professionele portretfoto van de schilder
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
              Over Cousin Colors
            </p>
            <h2 className="text-display-md font-semibold text-ink-950 text-balance">
              Een schilder die zijn vak serieus neemt
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">
              <p>
                Cousin Colors staat voor schilderwerken met karakter. Niet de goedkoopste,
                maar wel de juiste keuze voor wie waarde hecht aan een verzorgd resultaat
                en een persoonlijke aanpak.
              </p>
              <p>
                We luisteren naar wat je wilt, denken mee over kleuren en materialen, en
                voeren de werken uit met oog voor detail. Je woning is bij ons in goede
                handen.
              </p>
            </div>
            <Link to="/over-ons" className="btn-secondary mt-8">
              Leer ons beter kennen
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
