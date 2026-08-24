import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8146323/pexels-photo-8146323.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sfeervolle, pas geschilderde woonkamer met natuurlijk licht"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-ink-950/30 to-ink-950/60" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[100svh] items-center pt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="mb-5 animate-fade-in-down text-sm font-medium uppercase tracking-wider text-cream-100/90">
              {COMPANY.name} — Schilderwerken
            </p>
            <h1 className="animate-fade-in-up text-display-xl font-semibold text-cream-50 text-balance">
              Professionele schilderwerken.
              <br />
              <span className="text-clay-300">Persoonlijk uitgevoerd.</span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-in-up text-lg leading-relaxed text-cream-100/90" style={{ animationDelay: '0.1s' }}>
              Van eerste kleurkeuze tot perfecte afwerking. Cousin Colors zorgt voor
              schilderwerken die je woning opnieuw karakter geven.
            </p>
            <div className="mt-9 flex animate-fade-in-up flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '0.2s' }}>
              <Link to="/offerte" className="btn-primary">
                Vraag een vrijblijvende offerte aan
                <ArrowRight size={18} />
              </Link>
              {COMPANY.phone && (
                <a
                  href={`tel:${COMPANY.phone}`}
                  onClick={() => trackEvent('phone_click')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-200/30 px-7 py-3.5 text-sm font-semibold text-cream-50 transition-all duration-300 hover:bg-cream-50 hover:text-ink-950"
                >
                  <Phone size={18} />
                  Bel rechtstreeks
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-cream-200/40">
          <div className="mt-2 h-2 w-1 animate-bounce rounded-full bg-cream-200/60" />
        </div>
      </div>
    </section>
  );
}
