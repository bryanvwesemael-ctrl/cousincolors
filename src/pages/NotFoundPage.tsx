import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Pagina niet gevonden | Cousin Colors"
        description="Deze pagina bestaat niet of is verplaatst."
      />
      <div className="flex min-h-[70vh] items-center justify-center px-5 pt-20">
        <div className="text-center">
          <p className="font-display text-7xl font-semibold text-clay-300">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-ink-950">Pagina niet gevonden</h1>
          <p className="mt-3 text-sm text-ink-600">
            Deze pagina bestaat niet of is verplaatst.
          </p>
          <Link to="/" className="btn-primary mt-8">
            <ArrowLeft size={18} />
            Terug naar home
          </Link>
        </div>
      </div>
    </>
  );
}
