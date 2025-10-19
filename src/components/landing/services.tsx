import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Bath, Smile, ShowerHead, Palette, FlaskConical, Droplet, MoreHorizontal } from 'lucide-react';

const services = [
  { name: 'Hair Cut', icon: <Scissors className="w-10 h-10" /> },
  { name: 'Spa', icon: <Bath className="w-10 h-10" /> },
  { name: 'Facial', icon: <Smile className="w-10 h-10" /> },
  { name: 'Hair Wash', icon: <ShowerHead className="w-10 h-10" /> },
  { name: 'Hair Color', icon: <Palette className="w-10 h-10" /> },
  { name: 'Hair Treatment', icon: <FlaskConical className="w-10 h-10" /> },
  { name: 'Wax', icon: <Droplet className="w-10 h-10" /> },
  { name: 'Others', icon: <MoreHorizontal className="w-10 h-10" /> },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Experience luxury and style with our wide range of professional salon services.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <Card key={service.name} className="bg-card border-border/50 text-center flex flex-col items-center justify-center p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
              <div className="text-white mb-4">
                {service.icon}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-xl font-body font-semibold text-white">{service.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
