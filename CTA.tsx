import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';
import { useReveal } from '@/hooks/useReveal';

interface CTAProps {
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
}

export default function CTA({
  title = 'Klaar om jouw project te bespreken?',
  subtitle = 'Vraag een vrijblijvende offerte aan. We komen graag langs om de mogelijkheden te bekijken.',
  variant = 'dark',
}: CTAProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      className={`section-padding ${variant === 'dark' ? 'bg-ink-950 text-cream-50' : 'bg-cream-100 text-ink-950'}`}
    >
      <div className="container-page">
        <div className={`mx-auto max-w-3xl text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-display-md font-semibold text-balance">
            {title}
          </h2>
          <p className={`mt-5 text-lg leading-relaxed ${variant === 'dark' ? 'text-cream-200/80' : 'text-ink-600'}`}>
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/offerte" className="btn-primary">
              Vraag een vrijblijvende offerte aan
              <ArrowRight size={18} />
            </Link>
            {COMPANY.phone && (
              <a
                href={`tel:${COMPANY.phone}`}
                onClick={() => trackEvent('phone_click')}
                className={`btn-secondary ${variant === 'dark' ? 'border-cream-200/30 text-cream-50 hover:bg-cream-50 hover:text-ink-950 hover:border-cream-50' : ''}`}
              >
                <Phone size={18} />
                Bel direct
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
