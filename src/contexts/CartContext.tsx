import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface CartItem {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number, variantId?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchCartItems();
        } else {
          setItems([]);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartItems();
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCartItems = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products!inner (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = data?.map(item => ({
        id: item.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        product: {
          id: item.products.id,
          name: item.products.name,
          price: parseFloat(item.products.price.toString()),
          image_url: item.products.image_url || '/placeholder.svg'
        }
      })) || [];

      setItems(formattedItems);
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load cart items',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1, variantId?: string) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Sign in required',
        description: 'Please sign in to add items to your cart',
      });
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = items.find(
        item => item.product_id === productId && item.variant_id === variantId
      );

      if (existingItem) {
        // Update existing item quantity
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            variant_id: variantId,
            quantity
          });

        if (error) throw error;

        toast({
          title: 'Added to cart',
          description: 'Item has been added to your cart',
        });

        // Refresh cart items
        await fetchCartItems();
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add item to cart',
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      // Update local state
      setItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update quantity',
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      // Update local state
      setItems(prev => prev.filter(item => item.id !== itemId));

      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart',
      });
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove item from cart',
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart',
      });
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to clear cart',
      });
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};