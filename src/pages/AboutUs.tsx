import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Zap, Shield, Users, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  const values = [
    { icon: Target, title: 'Precision', description: 'Every product is engineered to deliver pixel-perfect accuracy and responsiveness.' },
    { icon: Zap, title: 'Innovation', description: 'We push boundaries with cutting-edge technology and forward-thinking design.' },
    { icon: Shield, title: 'Quality', description: 'Rigorous testing ensures every product meets our exacting standards.' },
    { icon: Users, title: 'Community', description: 'Built by gamers, for gamers — your feedback shapes our products.' },
    { icon: Award, title: 'Excellence', description: 'We settle for nothing less than the best in every detail.' },
    { icon: Heart, title: 'Passion', description: 'Gaming is our life. We pour that passion into everything we create.' },
  ];

  const milestones = [
    { year: '2020', event: 'Strafion founded with a vision to redefine gaming peripherals' },
    { year: '2021', event: 'Launched our first mechanical keyboard line to rave reviews' },
    { year: '2022', event: 'Expanded to gaming mice and audio gear' },
    { year: '2023', event: 'Introduced custom build service for enthusiasts' },
    { year: '2024', event: 'Reached 50,000+ gamers worldwide' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
            About Strafion
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're a team of passionate gamers and engineers on a mission to craft the most precise,
            responsive, and beautifully designed gaming peripherals on the planet.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Strafion, we believe your gear should never hold you back. We obsess over every switch,
              sensor, and surface finish so that when the moment matters, your equipment delivers. From
              casual players to competitive esports athletes, we build tools that unlock your full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <Card key={v.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-bold text-primary">{m.year}</span>
                </div>
                <div className="w-px bg-primary/30 flex-shrink-0" />
                <p className="text-muted-foreground pt-1">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
