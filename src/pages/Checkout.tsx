import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, getCartTotal, getCartCount, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.address || !form.city || !form.state || !form.pincode) {
      toast({ title: 'Missing fields', description: 'Please fill out all required fields.', variant: 'destructive' });
      return;
    }
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      const id = 'STR-' + Date.now().toString(36).toUpperCase();
      setOrderId(id);
      setOrderPlaced(true);
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8 mt-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild><Link to="/keyboards">Browse Products</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8 mt-20 flex items-center justify-center min-h-[60vh]">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-lg w-full text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
              <p className="text-lg font-semibold text-primary mb-6">Order ID: {orderId}</p>
              <p className="text-sm text-muted-foreground mb-8">
                A confirmation email will be sent to <span className="text-foreground">{form.email}</span>.
                You can track your order status from your profile.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild><Link to="/">Back to Home</Link></Button>
                <Button variant="outline" asChild><Link to="/keyboards">Continue Shopping</Link></Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/cart"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart</Link>
          </Button>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" value={form.city} onChange={(e) => handleChange('city', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input id="state" value={form.state} onChange={(e) => handleChange('state', e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input id="pincode" value={form.pincode} onChange={(e) => handleChange('pincode', e.target.value)} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Cash on Delivery (COD) is currently the only available payment method.</p>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;
                      return (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{product.name} × {item.quantity}</span>
                          <span>₹{(product.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      );
                    })}
                  </div>
                  <hr className="border-border/50" />
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <hr className="border-border/50" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <Button type="submit" className="w-full mt-4" size="lg" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Place Order — ₹${total.toLocaleString('en-IN')}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
