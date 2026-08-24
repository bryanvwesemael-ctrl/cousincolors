import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import CTA from '@/components/CTA';
import { FAQ_ITEMS } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

export default function FAQPage() {
  const { ref, isVisible } = useReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <SEO
        title="FAQ | Cousin Colors — Veelgestelde vragen over schilderwerken"
        description="Wat kost schilderwerk? Hoe lang duurt het? Werken jullie met behang? Antwoorden op de meest gestelde vragen over schilderwerken."
        canonicalPath="/faq"
        jsonLd={jsonLd}
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'FAQ' }]} />

      <div className="container-page pt-10 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Veelgestelde vragen
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Goed om te weten
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          Antwoorden op de vragen die we het vaakst krijgen. Staat je vraag er niet bij? Neem gerust contact op.
        </p>
      </div>

      <section className="bg-cream-50 py-12 lg:py-16">
        <div className="container-page">
          <div ref={ref} className={`mx-auto max-w-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <CTA
        title="Staat je vraag er niet bij?"
        subtitle="Neem contact op. We beantwoorden je vraag graag en vrijblijvend."
      />
    </>
  );
}
