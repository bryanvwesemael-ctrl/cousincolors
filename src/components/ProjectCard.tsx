import { MapPin } from 'lucide-react';
import type { ProjectData } from '@/lib/types';
import { useReveal } from '@/hooks/useReveal';

export default function ProjectCard({ project, index = 0 }: { project: ProjectData; index?: number }) {
  const { ref, isVisible } = useReveal();

  return (
    <article
      ref={ref}
      className={`group paint-hover overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.afterImage}
          alt={project.afterAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-clay-600/95 px-3 py-1 text-xs font-semibold text-cream-50 backdrop-blur-sm">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-sm text-ink-500">
          <MapPin size={14} />
          {project.location}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-ink-950">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span key={service} className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-ink-600">
              {service}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
