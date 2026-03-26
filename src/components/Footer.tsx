import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Github, 
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const socialLinks = [
    { name: 'Twitter', icon: Twitter },
    { name: 'Instagram', icon: Instagram },
    { name: 'YouTube', icon: Youtube },
    { name: 'GitHub', icon: Github },
  ];

  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'Mechanical Keyboards', href: '/keyboards' },
        { label: 'Gaming Mice', href: '/mice' },
        { label: 'Audio Gear', href: '/audio' },
        { label: 'Accessories', href: '/accessories' },
        { label: 'Custom Builds', href: '/custom-build' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Knowledge Base', href: '/support' },
        { label: 'Contact Us', href: '/support' },
        { label: 'Warranty', href: '/support' },
        { label: 'Returns', href: '/support' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/support' },
        { label: 'Careers', href: '/support' },
      ]
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({ title: 'Subscribed!', description: 'Thank you for subscribing to our newsletter.' });
    setEmail('');
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest updates on new releases, exclusive drops, and gaming tips delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <Button type="submit" variant="hero">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/6ec415c3-7c31-435e-bea8-c3bda38e67e2.png" 
                alt="Strafion Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 text-2xl font-bold">Strafion</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Precision-engineered gaming peripherals for enthusiasts who demand the ultimate in performance and customization.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Delhi NCR, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 92175 64977</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@strafion.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Strafion. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
