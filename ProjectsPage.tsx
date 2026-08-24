import { useState } from 'react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProjectCard from '@/components/ProjectCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import CTA from '@/components/CTA';
import { PROJECTS } from '@/lib/data';
import { useReveal } from '@/hooks/useReveal';

const CATEGORIES = ['Alles', 'Binnen', 'Buiten', 'Behang', 'Lakwerk'] as const;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('Alles');
  const { ref, isVisible } = useReveal();

  const filtered = filter === 'Alles' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const sliderProject = PROJECTS[0];

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
          Een selectie van afgeronde werken. Sleep de voor/na-slider en ontdek het verschil.
        </p>
      </div>

      {/* Before/After highlight */}
      <section className="bg-ink-950 py-16 lg:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-400">
                Voor & Na
              </p>
              <h2 className="text-display-md font-semibold text-cream-50">
                Zie de transformatie
              </h2>
              <p className="mt-4 text-base leading-relaxed text-cream-200/80">
                {sliderProject.description}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-cream-200/70">
                <span className="rounded-full bg-cream-50/10 px-3 py-1 font-medium">{sliderProject.title}</span>
                <span>{sliderProject.location}</span>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <BeforeAfterSlider
                beforeImage={sliderProject.beforeImage}
                afterImage={sliderProject.afterImage}
                beforeAlt={sliderProject.beforeAlt}
                afterAlt={sliderProject.afterAlt}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project grid */}
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
