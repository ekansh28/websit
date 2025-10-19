"use client";

import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const About = () => {
  const aboutImage = getPlaceholderImage('about-img');

  return (
    <section id="about" className="py-16 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">About DNA Salon</h2>
            <p className="text-md sm:text-lg text-foreground/80">
              At DNA Salon, we believe that beauty is an art form. Our mission is to provide an unparalleled salon experience, combining technical expertise with a passion for creativity. Our team of skilled stylists is dedicated to helping you discover and express your unique style.
            </p>
            <p className="text-md sm:text-lg text-foreground/80">
              We use only the highest quality products and stay up-to-date with the latest trends to ensure you leave feeling confident, refreshed, and beautiful. Welcome to a place where your hair's potential is unlocked.
            </p>
          </div>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-500"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
