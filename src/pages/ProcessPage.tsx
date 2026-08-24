import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProcessSection from '@/components/sections/ProcessSection';

export default function ProcessPage() {
  return (
    <>
      <SEO
        title="Werkwijze | Cousin Colors — Van kennismaking tot afwerking"
        description="Hoe werkt Cousin Colors? Van kennismaking en plaatsbezoek tot een duidelijke offerte en professionele uitvoering. Vier heldere stappen."
        canonicalPath="/werkwijze"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Werkwijze' }]} />
      <div className="container-page pt-10 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Werkwijze
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Van eerste gesprek tot nette afwerking
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          Geen verrassingen, maar duidelijke afspraken. Zo werken we samen aan jouw project.
        </p>
      </div>
      <ProcessSection />
    </>
  );
}
