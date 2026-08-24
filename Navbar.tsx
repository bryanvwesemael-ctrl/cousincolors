import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { COMPANY } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Diensten', path: '/diensten' },
  { label: 'Projecten', path: '/projecten' },
  { label: 'Werkwijze', path: '/werkwijze' },
  { label: 'Over ons', path: '/over-ons' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-sm shadow-ink-900/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between lg:h-20">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-clay-600'
                    : 'text-ink-700 hover:text-clay-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {COMPANY.phone && (
              <a
                href={`tel:${COMPANY.phone}`}
                onClick={() => trackEvent('phone_click')}
                className="flex items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-clay-600"
              >
                <Phone size={16} />
                {COMPANY.phoneDisplay}
              </a>
            )}
            <Link to="/offerte" className="btn-primary">
              Offerte aanvragen
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 lg:hidden"
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-ink-950/30 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-cream-50 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900"
              aria-label="Menu sluiten"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-clay-50 text-clay-700'
                    : 'text-ink-800 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/offerte" className="btn-primary mt-3 w-full">
              Offerte aanvragen
            </Link>
            {COMPANY.phone && (
              <a
                href={`tel:${COMPANY.phone}`}
                onClick={() => trackEvent('phone_click')}
                className="btn-secondary mt-2 w-full"
              >
                <Phone size={16} />
                Bel direct
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
