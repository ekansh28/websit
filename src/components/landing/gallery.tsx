"use client";

import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const galleryImageIds = ['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6'];

const Gallery = () => {
  const galleryImages = galleryImageIds.map(id => getPlaceholderImage(id));

  return (
    <section id="gallery" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">Our Gallery</h2>
          <p className="text-md sm:text-lg text-foreground/80 max-w-2xl mx-auto">
            A glimpse into the artistry and transformations at DNA Salon.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {galleryImages.map((image, index) => image && (
            <div key={index} className="relative aspect-[4/5] overflow-hidden rounded-lg group">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover w-full h-full filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 33vw"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
