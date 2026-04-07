import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {items.length === 0 ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-6">Add some items to get started</p>
                <Button asChild>
                  <Link to="/keyboards">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <Card key={item.productId} className="bg-card/50 backdrop-blur-sm border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.images[0] || '/placeholder.svg'}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg bg-accent/20"
                            />
                          </Link>
                          <div className="flex-1">
                            <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                            </Link>
                            <p className="text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                className="w-16 text-center"
                                min="1"
                              />
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeFromCart(item.productId)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                          <span>Subtotal: ₹{(product.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (18%)</span>
                      <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                    <hr className="border-border/50" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{Math.round(getCartTotal() * 1.18).toLocaleString('en-IN')}</span>
                    </div>
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/keyboards">Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
