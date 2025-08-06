import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingCart, User, Grid3X3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Grid3X3, label: 'Categories', href: '/keyboards' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: ShoppingCart, label: 'Cart', href: '/cart' },
  { icon: User, label: 'Profile', href: '/profile' }
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Hide on auth page or desktop
  if (location.pathname === '/auth') return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/20 lg:hidden"
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="relative flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <motion.div
                className={cn(
                  "relative flex flex-col items-center transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mb-1" />
                  {item.label === 'Cart' && cartCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {item.label}
                </span>
              </motion.div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};