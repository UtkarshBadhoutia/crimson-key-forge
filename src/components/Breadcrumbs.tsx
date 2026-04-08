import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  keyboards: 'Keyboards',
  mice: 'Mice',
  audio: 'Audio',
  accessories: 'Accessories',
  'custom-build': 'Custom Build',
  support: 'Support',
  cart: 'Cart',
  checkout: 'Checkout',
  profile: 'Profile',
  auth: 'Sign In',
  search: 'Search',
  about: 'About Us',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  warranty: 'Warranty',
  returns: 'Returns',
  product: 'Product',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-6 pt-20 pb-2">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {segments.map((segment, i) => {
          const path = '/' + segments.slice(0, i + 1).join('/');
          const isLast = i === segments.length - 1;
          const label = routeLabels[segment] || decodeURIComponent(segment);

          return (
            <li key={path} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link to={path} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
