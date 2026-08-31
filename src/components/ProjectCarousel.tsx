import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { ProjectData } from '@/lib/types';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { useReveal } from '@/hooks/useReveal';

export default function ProjectCarousel({ projects }: { projects: ProjectData[] }) {
  const [index, setIndex] = useState(0);
  const { ref, isVisible } = useReveal();

  useEffect(() => {
    setIndex(0);
  }, [projects.length]);

  if (projects.length === 0) return null;

  const project = projects[Math.min(index, projects.length - 1)];
  const goPrev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const goNext = () => setIndex((i) => (i + 1) % projects.length);

  return (
    <div
      ref={ref}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }}
      className={`mx-auto max-w-3xl transition-all duration-700 focus:outline-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <BeforeAfterSlider
        key={project.id}
        beforeImage={project.beforeImage}
        afterImage={project.afterImage}
        beforeAlt={project.beforeAlt}
        afterAlt={project.afterAlt}
      />

      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin size={14} />
            {project.location}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-ink-950">{project.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-600">
                {service}
              </span>
            ))}
          </div>
        </div>

        {projects.length > 1 && (
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Vorig project"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-700 shadow-sm ring-1 ring-ink-200 transition-colors hover:bg-ink-950 hover:text-cream-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Volgend project"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-700 shadow-sm ring-1 ring-ink-200 transition-colors hover:bg-ink-950 hover:text-cream-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {projects.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ga naar project ${i + 1}: ${p.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-clay-600' : 'w-2 bg-ink-200 hover:bg-ink-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
