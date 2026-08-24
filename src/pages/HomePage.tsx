import SEO from '@/components/SEO';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesSection from '@/components/sections/ServicesSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import ProcessSection from '@/components/sections/ProcessSection';
import AboutPreview from '@/components/sections/AboutPreview';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQAccordion from '@/components/FAQAccordion';
import CTA from '@/components/CTA';
import { FAQ_ITEMS, COMPANY } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

export default function HomePage() {
  const { ref, isVisible } = useReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: COMPANY.name,
    description: COMPANY.description,
    url: COMPANY.url,
    email: COMPANY.email,
    image: 'https://images.pexels.com/photos/8146323/pexels-photo-8146323.jpeg?auto=compress&cs=tinysrgb&w=1200',
    priceRange: '€€',
    areaServed: COMPANY.regionCities,
    knowsAbout: ['Binnenschilderwerken', 'Buitenschilderwerken', 'Behangwerken', 'Schuren en lakken'],
  };

  return (
    <>
      <SEO
        title="Cousin Colors — Professionele schilderwerken. Persoonlijk uitgevoerd."
        description="Van eerste kleurkeuze tot perfecte afwerking. Cousin Colors zorgt voor schilderwerken die je woning opnieuw karakter geven. Binnenschilderwerken, buitenschilderwerken, behang en lakwerk."
        canonicalPath="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <BeforeAfterSection />
      <ProcessSection />
      <AboutPreview />
      <ReviewsSection />

      {/* FAQ preview */}
      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div ref={ref} className={`mx-auto max-w-3xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-clay-600">
              Veelgestelde vragen
            </p>
            <h2 className="text-center text-display-md font-semibold text-ink-950 text-balance">
              Goed om te weten
            </h2>
            <div className="mt-10">
              <FAQAccordion items={FAQ_ITEMS.slice(0, 5)} />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
