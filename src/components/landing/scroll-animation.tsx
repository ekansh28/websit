"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScissorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#dddddd', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g className="scissor-group">
        <circle cx="6" cy="6" r="3" stroke="url(#sheen)"></circle>
        <circle cx="6" cy="18" r="3" stroke="url(#sheen)"></circle>
        <g className="blade-1">
          <line x1="8.12" y1="8.12" x2="12" y2="12" stroke="url(#sheen)"></line>
          <line x1="12" y1="12" x2="22" y2="2" stroke="url(#sheen)"></line>
        </g>
        <g className="blade-2">
          <line x1="8.12" y1="15.88" x2="12" y2="12" stroke="url(#sheen)"></line>
          <line x1="12" y1="12" x2="22" y2="22" stroke="url(#sheen)"></line>
        </g>
      </g>
    </svg>
);


const ScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scissorRef = useRef<SVGSVGElement>(null);
  const bookingSection = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      bookingSection.current = document.getElementById('booking');
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !scissorRef.current || !bookingSection.current) return;
      
      gsap.set(bookingSection.current, { opacity: 0, y: 100 });
      gsap.set(scissorRef.current, { scale: 0.1, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(scissorRef.current, {
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
      }, 0);

      tl.to(scissorRef.current.querySelector('.blade-1'), {
          rotation: -15,
          transformOrigin: "8px 8px",
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut"
      }, 0.1);

      tl.to(scissorRef.current.querySelector('.blade-2'), {
          rotation: 15,
          transformOrigin: "8px 16px",
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut"
      }, 0.1);
      
      tl.to(scissorRef.current.querySelector('.blade-1'), {
        rotation: -25,
        transformOrigin: "8px 8px",
        duration: 0.2,
        ease: "power3.in"
      }, ">-0.1");

      tl.to(scissorRef.current.querySelector('.blade-2'), {
        rotation: 25,
        transformOrigin: "8px 16px",
        duration: 0.2,
        ease: "power3.in"
      }, "<");

      tl.to(scissorRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.3,
      }, ">-0.1");

      tl.to(bookingSection.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "<");


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <ScissorIcon ref={scissorRef} className="w-24 h-24 md:w-32 md:h-32 text-white" />
    </div>
  );
};

export default ScrollAnimation;
