import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { X, Search, SlidersHorizontal, IndianRupee } from 'lucide-react';

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
  }) => void;
  categories: string[];
  brands: string[];
}

export const ProductFilters = ({ onFiltersChange, categories, brands }: ProductFiltersProps) => {
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    minPrice: 0,
    maxPrice: 50000,
    search: '',
    sortBy: 'newest'
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeCount = [
    filters.category !== 'all',
    filters.brand !== 'all',
    filters.search !== '',
    filters.minPrice > 0 || filters.maxPrice < 50000,
  ].filter(Boolean).length;

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange({
      ...updated,
      category: updated.category !== 'all' ? updated.category : undefined,
      brand: updated.brand !== 'all' ? updated.brand : undefined,
      minPrice: updated.minPrice > 0 ? updated.minPrice : undefined,
      maxPrice: updated.maxPrice < 50000 ? updated.maxPrice : undefined,
      search: updated.search || undefined,
    });
  };

  const clearFilters = () => {
    const cleared = { category: 'all', brand: 'all', minPrice: 0, maxPrice: 50000, search: '', sortBy: 'newest' };
    setFilters(cleared);
    onFiltersChange({});
  };

  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-4">
      <div className="container mx-auto px-6">
        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm"
            />
          </div>

          {/* Brand */}
          {brands.length > 0 && (
            <Select value={filters.brand} onValueChange={(v) => updateFilters({ brand: v })}>
              <SelectTrigger className="w-[150px] h-9 bg-secondary/50 border-border/50 text-sm">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Price Range Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-secondary/50 border-border/50 text-sm gap-2">
                <IndianRupee className="h-3.5 w-3.5" />
                Price
                {(filters.minPrice > 0 || filters.maxPrice < 50000) && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px] bg-primary/20 text-primary">
                    ₹{filters.minPrice.toLocaleString('en-IN')} - ₹{filters.maxPrice.toLocaleString('en-IN')}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="start">
              <div className="space-y-4">
                <p className="text-sm font-medium">Price Range</p>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => updateFilters({ minPrice: min, maxPrice: max })}
                  max={50000}
                  min={0}
                  step={500}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{filters.minPrice.toLocaleString('en-IN')}</span>
                  <span>₹{filters.maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Sort */}
          <Select value={filters.sortBy} onValueChange={(v) => updateFilters({ sortBy: v })}>
            <SelectTrigger className="w-[160px] h-9 bg-secondary/50 border-border/50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear */}
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 text-sm text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5 mr-1" />
              Clear ({activeCount})
            </Button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="h-9 bg-secondary/50 border-border/50 gap-1.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeCount > 0 && (
                <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Expanded Filters */}
          {showMobileFilters && (
            <div className="mt-3 pt-3 border-t border-border/30 grid grid-cols-2 gap-2">
              {brands.length > 0 && (
                <Select value={filters.brand} onValueChange={(v) => updateFilters({ brand: v })}>
                  <SelectTrigger className="h-9 bg-secondary/50 border-border/50 text-sm">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={filters.sortBy} onValueChange={(v) => updateFilters({ sortBy: v })}>
                <SelectTrigger className="h-9 bg-secondary/50 border-border/50 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price ↑</SelectItem>
                  <SelectItem value="price-high">Price ↓</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              {activeCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="col-span-2 h-8 text-xs">
                  <X className="h-3 w-3 mr-1" /> Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
