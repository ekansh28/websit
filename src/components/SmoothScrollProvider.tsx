"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with Apple-like smooth scrolling
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Setup scroll snapping for sections
    const setupScrollSnapping = () => {
      const sections = document.querySelectorAll('section[id]');
      let isSnapping = false;
      let snapTimeout: NodeJS.Timeout;

      sections.forEach((section, index) => {
        const sectionElement = section as HTMLElement;

        // Create scroll-triggered animations for each section
        gsap.fromTo(sectionElement,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Add parallax effect to background images
        const bgImage = sectionElement.querySelector('img');
        if (bgImage) {
          gsap.fromTo(bgImage,
            {
              yPercent: -20,
              scale: 1.1
            },
            {
              yPercent: 20,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              }
            }
          );
        }
      });

      // Improved snap functionality with better section detection
      const findClosestSection = () => {
        const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const snapThreshold = viewportHeight * 0.3;

        let closestSection = sections[0];
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionCenter = sectionTop + sectionHeight / 2;
          const viewportCenter = scrollY + viewportHeight / 2;

          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        return closestSection;
      };

      const snapToSection = (targetSection: HTMLElement) => {
        if (isSnapping) return;

        isSnapping = true;
        const targetPosition = targetSection.offsetTop;

        lenis.scrollTo(targetPosition, {
          duration: 1.2,
          easing: (t) => {
            // Apple-like easing curve
            return t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          },
          onComplete: () => {
            setTimeout(() => {
              isSnapping = false;
            }, 300);
          }
        });
      };

      // Wheel event handler for snap functionality
      const handleWheel = (e: WheelEvent) => {
        if (isSnapping) {
          e.preventDefault();
          return;
        }

        // Clear any existing timeout
        clearTimeout(snapTimeout);

        // Set a timeout to snap to nearest section after scrolling stops
        snapTimeout = setTimeout(() => {
          const closestSection = findClosestSection();
          const currentScrollY = window.pageYOffset;
          const sectionTop = closestSection.offsetTop;
          const threshold = window.innerHeight * 0.15;

          // Only snap if we're not already very close to the section
          if (Math.abs(currentScrollY - sectionTop) > threshold) {
            snapToSection(closestSection);
          }
        }, 150);
      };

      // Touch/trackpad gesture handling for better mobile experience
      let touchStartY = 0;
      let touchEndY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (isSnapping) return;

        touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        // Minimum swipe distance to trigger snap
        if (Math.abs(deltaY) > 50) {
          setTimeout(() => {
            const closestSection = findClosestSection();
            snapToSection(closestSection);
          }, 100);
        }
      };

      // Keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isSnapping) return;

        const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
        const currentSection = findClosestSection();
        const currentIndex = sections.indexOf(currentSection);

        let targetIndex = currentIndex;

        switch (e.key) {
          case 'ArrowDown':
          case 'PageDown':
          case ' ': // Spacebar
            targetIndex = Math.min(sections.length - 1, currentIndex + 1);
            e.preventDefault();
            break;
          case 'ArrowUp':
          case 'PageUp':
            targetIndex = Math.max(0, currentIndex - 1);
            e.preventDefault();
            break;
          case 'Home':
            targetIndex = 0;
            e.preventDefault();
            break;
          case 'End':
            targetIndex = sections.length - 1;
            e.preventDefault();
            break;
        }

        if (targetIndex !== currentIndex) {
          snapToSection(sections[targetIndex]);
        }
      };

      // Only add snap on desktop for better UX
      if (window.innerWidth > 768) {
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('wheel', handleWheel);
          window.removeEventListener('keydown', handleKeyDown);
          clearTimeout(snapTimeout);
        };
      } else {
        // Mobile touch events
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchend', handleTouchEnd);
          clearTimeout(snapTimeout);
        };
      }
    };

    // Setup animations after DOM is ready
    const initTimer = setTimeout(setupScrollSnapping, 100);

    return () => {
      clearTimeout(initTimer);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
