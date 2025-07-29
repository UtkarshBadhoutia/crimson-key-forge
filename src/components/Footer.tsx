import { Button } from '@/components/ui/button';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Github, 
  MessageCircle, 
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', badge: false },
    { name: 'Instagram', icon: Instagram, href: '#', badge: true },
    { name: 'YouTube', icon: Youtube, href: '#', badge: false },
    { name: 'GitHub', icon: Github, href: '#', badge: true },
  ];

  const footerSections = [
    {
      title: 'Products',
      links: [
        'Mechanical Keyboards',
        'Gaming Mice',
        'Audio Gear',
        'Accessories',
        'Custom Builds'
      ]
    },
    {
      title: 'Support',
      links: [
        'Knowledge Base',
        'User Forums',
        'Warranty',
        'Returns',
        'Contact Us'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Careers',
        'Press Kit',
        'Partners',
        'Sustainability'
      ]
    }
  ];

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
            <div className="flex max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="hero">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">X</span>
              </div>
              <span className="ml-3 text-2xl font-bold">XTECH</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Precision-engineered gaming peripherals for enthusiasts who demand the ultimate in performance and customization.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@xtech.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <div key={social.name} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                  {social.badge && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
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
              © 2024 XTECH. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="glow" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};