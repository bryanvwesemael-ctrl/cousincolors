import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import { COMPANY, SERVICES } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-100">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-5">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-50 text-ink-950">
                  <span className="font-display text-lg font-bold leading-none">CC</span>
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-cream-50">
                  Cousin Colors
                </span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream-200/80">
              Professionele schilderwerken. Persoonlijk uitgevoerd. Van eerste kleurkeuze
              tot perfecte afwerking.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-300">
              Diensten
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/diensten/${service.slug}`}
                    className="text-sm text-cream-200/80 transition-colors hover:text-clay-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-300">
              Navigatie
            </h3>
            <ul className="space-y-2.5">
              <li><Link to="/projecten" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">Projecten</Link></li>
              <li><Link to="/werkwijze" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">Werkwijze</Link></li>
              <li><Link to="/over-ons" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">Over ons</Link></li>
              <li><Link to="/faq" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">Contact</Link></li>
              <li><Link to="/offerte" className="text-sm text-cream-200/80 hover:text-clay-300 transition-colors">Offerte aanvragen</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream-300">
              Contact
            </h3>
            <ul className="space-y-3">
              {COMPANY.phone && (
                <li>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    onClick={() => trackEvent('phone_click')}
                    className="flex items-center gap-3 text-sm text-cream-200/80 hover:text-clay-300 transition-colors"
                  >
                    <Phone size={16} className="text-clay-400" />
                    {COMPANY.phoneDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm text-cream-200/80 hover:text-clay-300 transition-colors"
                >
                  <Mail size={16} className="text-clay-400" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-200/80">
                <MapPin size={16} className="text-clay-400" />
                {COMPANY.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-200/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream-200/50">
            &copy; {new Date().getFullYear()} {COMPANY.name}. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="text-xs text-cream-200/50 hover:text-clay-300 transition-colors">Privacybeleid</Link>
            <Link to="/cookiebeleid" className="text-xs text-cream-200/50 hover:text-clay-300 transition-colors">Cookiebeleid</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
