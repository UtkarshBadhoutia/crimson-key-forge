import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  productId: string;
  productName: string;
  price: number;
  inStock: boolean;
  className?: string;
}

export const FloatingActionButton = ({ 
  productId, 
  productName, 
  price, 
  inStock, 
  className 
}: FloatingActionButtonProps) => {
  const { addToCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // For now, just track quantity locally (you can integrate with cart state later)
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    setIsAdding(true);
    await addToCart(productId, 1);
    setIsAdding(false);
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <motion.div
      className={cn(
        "fixed bottom-20 right-4 z-30 lg:hidden",
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {quantity === 0 ? (
          <motion.div
            key="add-button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className={cn(
                "h-14 w-14 rounded-full shadow-elevated hover:shadow-red-glow transition-all duration-300",
                "bg-primary hover:bg-primary/90 text-primary-foreground",
                isAdding && "animate-pulse"
              )}
            >
              {isAdding ? (
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ShoppingCart className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="quantity-controls"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="flex flex-col gap-2 items-center"
          >
            {/* Quantity Display */}
            <motion.div
              className="bg-card/95 backdrop-blur-sm border border-border/20 rounded-full px-4 py-2 shadow-elevated"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {quantity}
                </Badge>
                <span className="text-sm font-medium text-foreground">
                  ${(price * quantity).toFixed(2)}
                </span>
              </div>
            </motion.div>

            {/* Quantity Controls */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="h-10 w-10 rounded-full bg-card/95 backdrop-blur-sm border-border/20 hover:bg-card"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                onClick={() => handleUpdateQuantity(quantity + 1)}
                disabled={!inStock}
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};