import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import BrushReveal from '@/components/BrushReveal';
import { useReveal } from '@/hooks/useReveal';

export default function BeforeAfterSection() {
  const { ref, isVisible } = useReveal();
  const project = PROJECTS[0];

  return (
    <section className="section-padding bg-ink-950 text-cream-50">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-400">
              Voor & Na
            </p>
            <h2 className="text-display-md font-semibold text-cream-50 text-balance">
              Zie het verschil
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream-200/80">
              Scroll verder en zie hoe de kwast de ruimte verft. Een voorbeeld uit onze
              projecten.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-cream-200/70">
              <span className="rounded-full bg-cream-50/10 px-3 py-1 font-medium">{project.title}</span>
              <span>{project.location}</span>
            </div>
            <Link to="/projecten" className="btn-primary mt-8">
              Bekijk meer projecten
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BrushReveal
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeAlt={project.beforeAlt}
              afterAlt={project.afterAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
