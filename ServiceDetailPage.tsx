import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import CTA from '@/components/CTA';
import { SERVICES } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);
  const { ref, isVisible } = useReveal();

  if (!service) return <Navigate to="/diensten" replace />;

  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'Cousin Colors', url: 'https://www.cousincolors.be' },
    areaServed: 'België',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/diensten/${service.slug}`}
        ogImage={service.image}
        jsonLd={{ ...jsonLd, ...faqLd }}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Diensten', path: '/diensten' },
          { label: service.title },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page pt-10 pb-16 lg:pt-12 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
                {service.shortTitle}
              </p>
              <h1 className="text-display-lg font-semibold text-ink-950 text-balance">
                {service.title}
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-ink-600">
                {service.tagline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                {service.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/offerte" className="btn-primary">
                  Vraag een vrijblijvende offerte aan
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Stel een vraag
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Applications */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-page">
          <div ref={ref} className={`grid gap-10 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div>
              <h2 className="text-2xl font-semibold text-ink-950">Voordelen</h2>
              <ul className="mt-6 space-y-3">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Check size={14} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-ink-950">Toepassingen</h2>
              <ul className="mt-6 space-y-3">
                {service.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                      <Check size={14} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-700">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-ink-950">Werkwijze</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-100">
                <span className="font-display text-3xl font-semibold text-clay-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-ink-950">Veelgestelde vragen</h2>
          <div className="mt-8 max-w-3xl">
            <FAQAccordion items={service.faq} />
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-ink-950">Andere diensten</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/diensten/${s.slug}`}
                className="group flex items-center justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-ink-100 transition-all hover:ring-ink-200 hover:shadow-md"
              >
                <span className="text-sm font-semibold text-ink-900">{s.title}</span>
                <ArrowRight size={16} className="text-ink-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
