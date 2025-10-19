"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = getPlaceholderImage('hero-bg');

  return (
    <section id="home" className="relative w-full h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover object-center filter grayscale"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold tracking-tighter text-white">
            DNA Salon
          </h1>
          <p className="max-w-[700px] text-md sm:text-lg md:text-xl text-foreground/80">
            Redefine Your Look
          </p>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300">
            <Link href="#booking">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
