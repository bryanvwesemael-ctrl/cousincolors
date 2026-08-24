import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { COMPANY } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="flex gap-px bg-ink-950/5 p-px">
        {COMPANY.phone ? (
          <a
            href={`tel:${COMPANY.phone}`}
            onClick={() => trackEvent('phone_click')}
            className="flex flex-1 items-center justify-center gap-2 bg-ink-950 py-3.5 text-sm font-semibold text-cream-50"
          >
            <Phone size={16} />
            Bel
          </a>
        ) : null}
        <Link
          to="/offerte"
          className="flex flex-1 items-center justify-center gap-2 bg-clay-600 py-3.5 text-sm font-semibold text-cream-50"
        >
          Offerte aanvragen
        </Link>
      </div>
    </div>
  );
}
