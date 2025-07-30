import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Keyboards', href: '/keyboards' },
    { name: 'Mice', href: '/mice' },
    { name: 'Audio', href: '/audio' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Custom Build', href: '/custom-build' },
    { name: 'Support', href: '/support' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="text-primary-foreground font-bold text-xl transform group-hover:scale-110 transition-transform">
                  X
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-glow rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <span className="ml-3 text-xl font-bold text-foreground">XTECH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};