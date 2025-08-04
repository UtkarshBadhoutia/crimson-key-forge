import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

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
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
    sortBy: 'newest'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    // Track active filters for display
    const active: string[] = [];
    if (updated.category) active.push(`Category: ${updated.category}`);
    if (updated.brand) active.push(`Brand: ${updated.brand}`);
    if (updated.search) active.push(`Search: ${updated.search}`);
    if (updated.minPrice > 0 || updated.maxPrice < 1000) {
      active.push(`Price: $${updated.minPrice} - $${updated.maxPrice}`);
    }
    setActiveFilters(active);

    onFiltersChange({
      ...updated,
      category: updated.category || undefined,
      brand: updated.brand || undefined,
      minPrice: updated.minPrice > 0 ? updated.minPrice : undefined,
      maxPrice: updated.maxPrice < 1000 ? updated.maxPrice : undefined,
      search: updated.search || undefined,
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      search: '',
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange({});
  };

  const removeFilter = (filterToRemove: string) => {
    if (filterToRemove.startsWith('Category:')) {
      updateFilters({ category: '' });
    } else if (filterToRemove.startsWith('Brand:')) {
      updateFilters({ brand: '' });
    } else if (filterToRemove.startsWith('Search:')) {
      updateFilters({ search: '' });
    } else if (filterToRemove.startsWith('Price:')) {
      updateFilters({ minPrice: 0, maxPrice: 1000 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="search">Search Products</Label>
            <Input
              id="search"
              placeholder="Search by name or description..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Category Filter */}
          <div>
            <Label>Category</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand Filter */}
          <div>
            <Label>Brand</Label>
            <Select value={filters.brand} onValueChange={(value) => updateFilters({ brand: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label>Price Range</Label>
            <div className="mt-3 space-y-3">
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) => updateFilters({ minPrice: min, maxPrice: max })}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div>
            <Label>Sort By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {activeFilters.length > 0 && (
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear All Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};