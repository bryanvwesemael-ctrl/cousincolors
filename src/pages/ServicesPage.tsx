import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServicesSection from '@/components/sections/ServicesSection';
import CTA from '@/components/CTA';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Diensten | Cousin Colors — Binnenschilderwerken, buitenschilderwerken, behang en lakwerk"
        description="Cousin Colors is gespecialiseerd in binnenschilderwerken, buitenschilderwerken, behangwerken en schuren & lakken. Ontdek wat we voor je woning kunnen doen."
        canonicalPath="/diensten"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Diensten' }]} />
      <div className="container-page pt-8 pb-4">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Diensten
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Schilderwerken met oog voor detail
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          Vier specialisaties, één ambachtelijke aanpak. Van binnen tot buiten, van behang tot lakwerk.
        </p>
      </div>
      <ServicesSection />
      <CTA />
    </>
  );
}
