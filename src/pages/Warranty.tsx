import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

const Warranty = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent">Warranty Policy</h1>
        <p className="text-muted-foreground mb-12">Your Strafion products are built to last — and backed by our warranty.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">2-Year Limited Warranty</h3>
              <p className="text-muted-foreground">All Strafion peripherals are covered for 2 years from the date of purchase against manufacturing defects.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">30-Day Satisfaction Guarantee</h3>
              <p className="text-muted-foreground">Not satisfied? Return any product within 30 days for a full refund, no questions asked.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" /> What's Covered
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Manufacturing defects in materials and workmanship</li>
              <li>• Faulty switches, sensors, or electronic components</li>
              <li>• Connectivity issues (wired or wireless)</li>
              <li>• Structural defects (keycaps, scroll wheels, hinges)</li>
              <li>• Software/firmware issues affecting functionality</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-destructive" /> What's Not Covered
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Physical damage from drops, spills, or misuse</li>
              <li>• Normal wear and tear (keycap shine, cable fraying)</li>
              <li>• Unauthorized modifications or repairs</li>
              <li>• Cosmetic damage that doesn't affect functionality</li>
              <li>• Products purchased from unauthorized sellers</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">How to Claim Warranty</h2>
          <ol className="space-y-4 text-muted-foreground list-decimal pl-6">
            <li>Contact our support team at <span className="text-primary">support@strafion.com</span> with your order number and a description of the issue.</li>
            <li>Our team will diagnose the issue and provide a return shipping label if needed.</li>
            <li>Ship the product to us — we'll repair or replace it within 7–10 business days.</li>
          </ol>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Warranty;
