import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface SkeletonLoaderProps {
  type: 'product-card' | 'product-grid' | 'hero' | 'filters';
  count?: number;
}

export const SkeletonLoader = ({ type, count = 1 }: SkeletonLoaderProps) => {
  const shimmer = {
    initial: { backgroundPosition: '-200px 0' },
    animate: { backgroundPosition: '200px 0' },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  };

  const ProductCardSkeleton = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <motion.div
          className="bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400px_100%]"
          initial={{ backgroundPosition: '-200px 0' }}
          animate={{ backgroundPosition: '200px 0' }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear" as any
          }}
        >
          <Skeleton className="aspect-[4/3] w-full" />
        </motion.div>
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-full" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HeroSkeleton = () => (
    <div className="relative h-[600px] overflow-hidden rounded-lg">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400px_100%]"
        initial={{ backgroundPosition: '-200px 0' }}
        animate={{ backgroundPosition: '200px 0' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear" as any
        }}
      >
        <Skeleton className="w-full h-full" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 p-8">
        <Skeleton className="h-12 w-96 max-w-full" />
        <Skeleton className="h-6 w-80 max-w-full" />
        <Skeleton className="h-6 w-72 max-w-full" />
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );

  const FiltersSkeleton = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16" />
        ))}
      </div>
    </div>
  );

  if (type === 'hero') {
    return <HeroSkeleton />;
  }

  if (type === 'filters') {
    return <FiltersSkeleton />;
  }

  if (type === 'product-grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCardSkeleton />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};