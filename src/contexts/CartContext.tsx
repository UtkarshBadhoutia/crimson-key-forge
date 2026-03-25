import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getCart, addCartItem, updateCartItemQty, removeCartItem, clearCartStorage, LocalCartItem } from '@/lib/localStorage';
import { getProductById } from '@/data/products';

interface CartContextType {
  items: LocalCartItem[];
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<LocalCartItem[]>(getCart);
  const { toast } = useToast();

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const updated = addCartItem(productId, quantity);
    setItems([...updated]);
    toast({ title: 'Added to cart', description: 'Item has been added to your cart' });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const updated = updateCartItemQty(productId, quantity);
    setItems([...updated]);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const updated = removeCartItem(productId);
    setItems([...updated]);
    toast({ title: 'Removed from cart', description: 'Item has been removed from your cart' });
  }, [toast]);

  const clearCart = useCallback(() => {
    clearCartStorage();
    setItems([]);
    toast({ title: 'Cart cleared', description: 'All items have been removed from your cart' });
  }, [toast]);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, isLoading: false, addToCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
