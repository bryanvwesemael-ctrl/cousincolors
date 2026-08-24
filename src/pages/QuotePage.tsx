import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteForm from '@/components/QuoteForm';
import ColorMoodPicker from '@/components/ColorMoodPicker';
import { useReveal } from '@/hooks/useReveal';

export default function QuotePage() {
  const { ref, isVisible } = useReveal();

  return (
    <>
      <SEO
        title="Offerte aanvragen | Cousin Colors — Vrijblijvende offerte"
        description="Vraag een vrijblijvende offerte aan. Vertel wat je nodig hebt, waar het project zich bevindt en wanneer je wilt starten. Cousin Colors neemt zo snel mogelijk contact op."
        canonicalPath="/offerte"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Offerte aanvragen' }]} />

      <div className="container-page pt-10 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Offerte
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Vraag een vrijblijvende offerte aan
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          Vul het formulier in en we nemen zo snel mogelijk contact met je op. Hoe meer
          je vertelt, hoe gerichter we kunnen reageren.
        </p>
      </div>

      <section className="bg-cream-50 py-12 lg:py-16">
        <div className="container-page">
          <div ref={ref} className={`mx-auto max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="mb-8">
              <ColorMoodPicker />
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
