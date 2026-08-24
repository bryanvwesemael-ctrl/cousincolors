import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CookiePage() {
  return (
    <>
      <SEO
        title="Cookiebeleid | Cousin Colors"
        description="Hoe Cousin Colors omgaat met cookies."
        canonicalPath="/cookiebeleid"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cookiebeleid' }]} />
      <div className="container-page pt-10 pb-20">
        <h1 className="text-display-md font-semibold text-ink-950">Cookiebeleid</h1>
        <div className="mt-8 max-w-3xl space-y-6 text-sm leading-relaxed text-ink-600">
          <p>
            Cousin Colors gebruikt enkel functionele cookies die noodzakelijk zijn voor
            de correcte werking van de website. Deze cookies vereisen geen toestemming.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Functionele cookies</h2>
          <p>
            Deze cookies zorgen ervoor dat de website naar behoren werkt. Ze worden niet
            gebruikt om je surfgedrag te volgen.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Analytische cookies</h2>
          <p>
            Als we analytische cookies plaatsen om het gebruik van de website te meten,
            vragen we daarvoor eerst je toestemming. Je kan deze toestemming altijd
            intrekken.
          </p>
          <h2 className="text-lg font-semibold text-ink-900">Vragen?</h2>
          <p>
            Heb je vragen over ons cookiebeleid? Neem gerust contact met ons op.
          </p>
        </div>
      </div>
    </>
  );
}
