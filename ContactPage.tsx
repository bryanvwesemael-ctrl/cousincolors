import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { COMPANY } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';
import { useReveal } from '@/hooks/useReveal';

export default function ContactPage() {
  const { ref, isVisible } = useReveal();

  return (
    <>
      <SEO
        title="Contact | Cousin Colors — Bel of vraag een offerte aan"
        description="Klaar om je project te bespreken? Neem contact op met Cousin Colors. Bel, mail of vul het contactformulier in."
        canonicalPath="/contact"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

      <div className="container-page pt-10 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Contact
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Klaar om je project te bespreken?
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          We helpen je graag verder. Bel ons, stuur een e-mail of vul het formulier in.
        </p>
      </div>

      <section className="bg-cream-50 py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Contact info */}
            <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-2xl font-semibold text-ink-950">Contactgegevens</h2>
              <div className="mt-6 space-y-5">
                {COMPANY.phone && (
                  <a
                    href={`tel:${COMPANY.phone}`}
                    onClick={() => trackEvent('phone_click')}
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600 transition-colors group-hover:bg-clay-100">
                      <Phone size={20} />
                    </span>
                    <div>
                      <p className="text-sm text-ink-500">Telefoon</p>
                      <p className="text-base font-semibold text-ink-950">{COMPANY.phoneDisplay}</p>
                    </div>
                  </a>
                )}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-4 group"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600 transition-colors group-hover:bg-clay-100">
                    <Mail size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-ink-500">E-mail</p>
                    <p className="text-base font-semibold text-ink-950">{COMPANY.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-ink-500">Werkregio</p>
                    <p className="text-base font-semibold text-ink-950">{COMPANY.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-50 text-clay-600">
                    <Clock size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-ink-500">Openingsuren</p>
                    <p className="text-base font-semibold text-ink-950">Ma–Vr: 8u–18u</p>
                    <p className="text-sm text-ink-500">Op afspraak</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-cream-100 p-6">
                <p className="text-sm leading-relaxed text-ink-600">
                  Liever een volledige offerte? Vul dan het{' '}
                  <a href="/offerte" className="font-semibold text-clay-600 hover:text-clay-700">
                    offerteformulier
                  </a>{' '}
                  in. Dan hebben we meteen alle info die we nodig hebben.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
