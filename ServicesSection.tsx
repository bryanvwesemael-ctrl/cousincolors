import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import { useReveal } from '@/hooks/useReveal';

export default function ServicesSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-page">
        <div ref={ref} className={`max-w-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-clay-600">
            Diensten
          </p>
          <h2 className="text-display-md font-semibold text-ink-950 text-balance">
            Wat Cousin Colors voor jou kan doen
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Van binnenschilderwerken tot behang en lakwerk. Vier specialisaties, één
            ambachtelijke aanpak.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/diensten" className="btn-secondary">
            Bekijk alle diensten
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
