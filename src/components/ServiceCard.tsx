import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceData } from '@/lib/types';
import { useReveal } from '@/hooks/useReveal';

export default function ServiceCard({ service, index = 0 }: { service: ServiceData; index?: number }) {
  const { ref, isVisible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to={`/diensten/${service.slug}`}
      className={`group paint-hover flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-100 transition-all duration-500 hover:shadow-xl hover:shadow-ink-900/5 hover:ring-ink-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/95 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur-sm">
          {service.shortTitle}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink-950">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
          {service.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 transition-colors group-hover:text-clay-700">
          Meer info
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
