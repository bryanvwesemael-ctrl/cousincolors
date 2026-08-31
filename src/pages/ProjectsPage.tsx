import { useState } from 'react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectCarousel from '@/components/ProjectCarousel';
import CTA from '@/components/CTA';
import { PROJECTS } from '@/lib/data';

const CATEGORIES = ['Alles', 'Binnen', 'Buiten', 'Behang', 'Lakwerk'] as const;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Alles');

  const filtered = filter === 'Alles' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <SEO
        title="Projecten | Cousin Colors — Schilderwerken in beeld"
        description="Bekijk projecten van Cousin Colors. Binnenschilderwerken, buitenschilderwerken, behang en lakwerk — zie het resultaat van ambachtelijk werk."
        canonicalPath="/projecten"
      />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Projecten' }]} />

      <div className="container-page pt-10 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
          Portfolio
        </p>
        <h1 className="text-display-lg font-semibold text-ink-950 text-balance max-w-3xl">
          Projecten die voor zich spreken
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          Blader door onze projecten en sleep de voor/na-slider om het verschil te ontdekken.
        </p>
      </div>

      <section className="section-padding bg-cream-50">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-ink-950 text-cream-50'
                    : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <ProjectCarousel projects={filtered} />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
