import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  priority?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  aspectRatio = '4/3',
  priority = false,
  quality = 80,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Load image when it comes into view (lazy loading)
  useEffect(() => {
    if (inView && !imageSrc && !priority) {
      setImageSrc(src);
    }
  }, [inView, imageSrc, src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc('/placeholder.svg');
    onError?.();
  };

  // Generate optimized image URLs (placeholder for CDN integration)
  const getOptimizedSrc = (originalSrc: string) => {
    // In a real implementation, you'd integrate with a CDN like Cloudinary, ImageKit, etc.
    // For now, we'll just return the original src
    if (originalSrc.includes('placeholder.svg')) return originalSrc;
    
    // Example: return `${originalSrc}?w=${width}&q=${quality}&fm=webp`;
    return originalSrc;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-muted",
        className
      )}
      style={{
        aspectRatio,
        width,
        height,
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400px_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
      )}

      {/* Image */}
      {imageSrc && (
        <motion.img
          src={getOptimizedSrc(imageSrc)}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <p className="text-xs">Image not found</p>
          </div>
        </div>
      )}
    </div>
  );
};