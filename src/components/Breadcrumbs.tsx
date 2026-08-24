import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-24 lg:pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.path ? (
              <Link to={item.path} className="transition-colors hover:text-clay-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-700">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight size={14} className="text-ink-300" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
