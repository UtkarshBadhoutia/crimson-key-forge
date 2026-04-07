import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-text bg-clip-text text-transparent">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the Strafion website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Products & Pricing</h2>
            <p>All prices are listed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. We reserve the right to modify prices at any time. Product images are for illustration purposes and may vary slightly from the actual product.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Orders & Payment</h2>
            <p>By placing an order, you confirm that all information provided is accurate. We reserve the right to cancel or refuse orders for any reason, including suspected fraud. Payment must be completed at the time of purchase.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Shipping & Delivery</h2>
            <p>We ship across India. Estimated delivery times are provided at checkout but are not guaranteed. Strafion is not responsible for delays caused by shipping carriers or customs processing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Returns & Refunds</h2>
            <p>Products may be returned within 30 days of delivery in their original condition and packaging. Refunds are processed within 7–10 business days after we receive the returned item. Custom-built products are non-refundable unless defective.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Warranty</h2>
            <p>All Strafion products are covered by a 2-year limited warranty against manufacturing defects. The warranty does not cover damage from misuse, modifications, or normal wear and tear.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p>Strafion shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the purchase price of the product.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
            <p>Questions about these terms? Contact us at <span className="text-primary">support@strafion.com</span>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
