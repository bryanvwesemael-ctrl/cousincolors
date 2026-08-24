import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Users, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import { useReveal } from '@/hooks/useReveal';

const VALUES = [
  { icon: Heart, title: 'Passie voor het vak', description: 'Schilderwerken is meer dan een job. Het is ambacht met aandacht voor detail.' },
  { icon: Users, title: 'Persoonlijk contact', description: 'Je spreekt rechtstreeks met de schilder. Geen tussenpersonen, wel duidelijke afspraken.' },
  { icon: Sparkles, title: 'Kwaliteit', description: 'We kiezen de juiste materialen en werken netjes. Een resultaat waar je jaren plezier van hebt.' },
  { icon: ShieldCheck, title: 'Nette uitvoering', description: 'Respect voor je woning. We dekken af, werken netjes en ruimen op.' },
];

export default function AboutPage() {
  const { ref, isVisible } = useReveal();

  return (
    <>
      <SEO
        title="Over Cousin Colors — Een schilder die zijn vak serieus neemt"
        description="Cousin Colors staat voor professionele schilderwerken met een persoonlijke aanpak. Passie voor het vak, oog voor detail en respect voor je woning."
        canonicalPath="/over-ons"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Over ons' }]} />

      <section className="container-page pt-10 pb-16 lg:pt-12 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
              Over Cousin Colors
            </p>
            <h1 className="text-display-lg font-semibold text-ink-950 text-balance">
              Een schilder die zijn vak serieus neemt
            </h1>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600">
              <p>
                Cousin Colors is ontstaan uit passie voor het schildersvak. Niet de goedkoopste,
                maar wel de juiste keuze voor wie waarde hecht aan een verzorgd resultaat
                en een persoonlijke aanpak.
              </p>
              <p>
                We luisteren naar wat je wilt, denken mee over kleuren en materialen, en
                voeren de werken uit met oog voor detail. Je woning is bij ons in goede handen.
              </p>
              <p>
                Of het nu gaat om een kamer die een nieuwe kleur nodig heeft, een gevel die
                bescherming verdient, of houtwerk dat opnieuw gelakt moet worden — we
                pakken elk project met dezelfde zorg aan.
              </p>
            </div>
            <Link to="/offerte" className="btn-primary mt-8">
              Vraag een vrijblijvende offerte aan
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-display-md font-semibold text-ink-950 text-center text-balance">
            Wat Cousin Colors drijft
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
