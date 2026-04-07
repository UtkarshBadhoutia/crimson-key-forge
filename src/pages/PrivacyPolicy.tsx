import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-text bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, shipping address, and payment details when you make a purchase. We also collect usage data including pages visited, device information, and browsing patterns to improve your experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfil your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to customer support inquiries</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal information. Payment data is processed through secure, PCI-compliant payment processors and is never stored on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies</h2>
            <p>We use essential cookies to ensure the website functions properly, and analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by contacting us at <span className="text-primary">support@strafion.com</span>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p>For privacy-related inquiries, contact us at <span className="text-primary">support@strafion.com</span> or call <span className="text-primary">+91 92175 64977</span>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
