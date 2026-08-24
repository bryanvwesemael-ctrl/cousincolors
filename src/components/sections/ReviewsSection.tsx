import { useReveal } from '@/hooks/useReveal';

export default function ReviewsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="bg-cream-100 py-16 lg:py-20">
      <div className="container-page">
        <div
          ref={ref}
          className={`mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ink-100 transition-all duration-700 sm:p-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-600">
            <span className="font-display text-lg font-bold">★</span>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-ink-950">
            Klantervaringen
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            Binnenkort vind je hier ervaringen van klanten van Cousin Colors.
          </p>
        </div>
      </div>
    </section>
  );
}
