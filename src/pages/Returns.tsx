import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Package, CreditCard, Truck } from 'lucide-react';

const Returns = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent">Returns & Refunds</h1>
        <p className="text-muted-foreground mb-12">We want you to be completely satisfied with your purchase.</p>

        {/* Process */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: RotateCcw, title: 'Request Return', desc: 'Contact support within 30 days of delivery' },
            { icon: Package, title: 'Pack & Ship', desc: 'Pack the item in original packaging and ship it back' },
            { icon: CreditCard, title: 'Inspection', desc: 'We inspect the item within 2 business days' },
            { icon: Truck, title: 'Refund Issued', desc: 'Refund processed to original payment method in 7–10 days' },
          ].map((step, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50 text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Return Eligibility</h2>
            <ul className="space-y-2">
              <li>• Product must be returned within 30 days of delivery</li>
              <li>• Item must be in original condition with all accessories and packaging</li>
              <li>• Custom-built products are non-returnable unless defective</li>
              <li>• Proof of purchase (order confirmation email) is required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Details</h2>
            <ul className="space-y-2">
              <li>• Refunds are issued to the original payment method</li>
              <li>• Processing time: 7–10 business days after inspection</li>
              <li>• Shipping costs for returns are covered by Strafion for defective items</li>
              <li>• For non-defective returns, a flat ₹200 return shipping fee applies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Exchanges</h2>
            <p>We offer free exchanges for defective products or incorrect orders. Contact <span className="text-primary">support@strafion.com</span> to initiate an exchange.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Returns;
