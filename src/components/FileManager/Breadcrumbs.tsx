import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  path: string;
  onNavigate: (path: string) => void;
}

export function Breadcrumbs({ path, onNavigate }: BreadcrumbsProps) {
  const segments = path.split('/').filter(Boolean);
  
  const breadcrumbs = [
    { label: 'My Files', path: '/' },
    ...segments.map((segment, index) => ({
      label: segment,
      path: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <nav className="flex items-center gap-1 px-4 py-3 text-sm" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          )}
          <button
            onClick={() => onNavigate(crumb.path)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors",
              index === breadcrumbs.length - 1
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {index === 0 && <Home className="w-4 h-4" />}
            <span>{crumb.label}</span>
          </button>
        </div>
      ))}
    </nav>
  );
}
