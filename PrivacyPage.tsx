import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { COMPANY } from '@/lib/data';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacybeleid | Cousin Colors"
        description="Hoe Cousin Colors omgaat met je persoonsgegevens."
        canonicalPath="/privacy"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacybeleid' }]} />
      <div className="container-page pt-10 pb-20">
        <h1 className="text-display-md font-semibold text-ink-950">Privacybeleid</h1>
        <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-ink-600">
          <p>
            {COMPANY.name} hecht waarde aan je privacy. We verzamelen enkel de
            persoonsgegevens die nodig zijn om je aanvraag te verwerken en contact met
            je op te nemen.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Welke gegevens verzamelen we?</h2>
          <p>
            Via onze formulieren verzamelen we je voornaam, naam, telefoonnummer, e-mailadres
            en de informatie die je vrijwillig over je project deelt (zoals locatie, type pand
            en beschrijving). Foto's die je uploadt worden gebruikt om je project te beoordelen.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Waarom verzamelen we deze gegevens?</h2>
          <p>
            We gebruiken je gegevens uitsluitend om je aanvraag te verwerken, een offerte op
            te stellen en contact met je op te nemen. We delen je gegevens niet met derden.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Hoe lang bewaren we je gegevens?</h2>
          <p>
            We bewaren je gegevens zolang als nodig is om je aanvraag te verwerken en daarna
            nog gedurende de wettelijke bewaartermijn.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Jouw rechten</h2>
          <p>
            Je hebt het recht om je gegevens in te kijken, te corrigeren of te laten verwijderen.
            Neem hiervoor contact op via {COMPANY.email}.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Cookies</h2>
          <p>
            We gebruiken enkel functionele cookies die nodig zijn voor de werking van de
            website. Voor analyse- of marketingcookies vragen we eerst je toestemming.
            Zie ons cookiebeleid voor meer informatie.
          </p>
        </div>
      </div>
    </>
  );
}
