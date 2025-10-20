"use client";

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { bookAppointment, type BookingState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BOOKING_CONFIG } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

const services = BOOKING_CONFIG.SERVICES;

const generateTimeSlots = () => {
  const slots = [];
  const intervalMinutes = BOOKING_CONFIG.TIME_SLOT_INTERVAL;

  for (let hour = BOOKING_CONFIG.START_HOUR; hour < BOOKING_CONFIG.END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }

  return slots.map(time => {
    const [hourStr, minute] = time.split(':');
    const hour = parseInt(hourStr);
    const period = hour >= 12 ? 'PM' : 'AM';
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;
    return `${displayHour}:${minute} ${period}`;
  });
};

const timeSlots = generateTimeSlots();

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" variant="outline" size="lg" disabled={pending}>
      {pending ? 'Booking...' : 'Book Now'}
    </Button>
  );
}

const ScissorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="30%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#A8A8A8" />
        </linearGradient>
        <filter id="metalShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      <style>
        {`
          .scissor-container {
            transform-origin: 60px 60px;
            animation: scissorEntry 2s ease-out;
          }

          .upper-blade {
            transform-origin: 60px 60px;
            animation: upperBladeSnap 2s ease-out;
          }

          .lower-blade {
            transform-origin: 60px 60px;
            animation: lowerBladeSnap 2s ease-out;
          }

          .cutting-line {
            stroke-dasharray: 40;
            stroke-dashoffset: 40;
            animation: cuttingEffect 2s ease-out 1.5s;
          }

          @keyframes scissorEntry {
            0% {
              opacity: 0;
              transform: scale(0.1) rotate(-45deg);
            }
            30% {
              opacity: 1;
              transform: scale(1.1) rotate(0deg);
            }
            40% {
              transform: scale(1) rotate(0deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes upperBladeSnap {
            0%, 30% {
              transform: rotate(-30deg);
            }
            45% {
              transform: rotate(-35deg);
            }
            50% {
              transform: rotate(-5deg);
            }
            55% {
              transform: rotate(-40deg);
            }
            70% {
              transform: rotate(-8deg);
            }
            75% {
              transform: rotate(-45deg);
            }
            90% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes lowerBladeSnap {
            0%, 30% {
              transform: rotate(30deg);
            }
            45% {
              transform: rotate(35deg);
            }
            50% {
              transform: rotate(5deg);
            }
            55% {
              transform: rotate(40deg);
            }
            70% {
              transform: rotate(8deg);
            }
            75% {
              transform: rotate(45deg);
            }
            90% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes cuttingEffect {
            0% {
              stroke-dashoffset: 40;
              opacity: 0;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }
        `}
      </style>

      <g className="scissor-container" filter="url(#metalShadow)">
        {/* Finger rings */}
        <circle cx="25" cy="25" r="12" fill="none" stroke="url(#metalGradient)" strokeWidth="3" opacity="0.9"/>
        <circle cx="25" cy="95" r="12" fill="none" stroke="url(#metalGradient)" strokeWidth="3" opacity="0.9"/>

        {/* Handles */}
        <rect x="20" y="37" width="10" height="20" fill="url(#metalGradient)" rx="2"/>
        <rect x="20" y="63" width="10" height="20" fill="url(#metalGradient)" rx="2"/>

        {/* Upper blade */}
        <g className="upper-blade">
          <path
            d="M 35 45 L 60 60 L 100 20 L 95 15 L 60 50 L 35 40 Z"
            fill="url(#metalGradient)"
            stroke="#999"
            strokeWidth="1"
          />
          <path
            d="M 35 40 L 60 50 L 85 25"
            fill="none"
            stroke="#FFF"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>

        {/* Lower blade */}
        <g className="lower-blade">
          <path
            d="M 35 75 L 60 60 L 100 100 L 95 105 L 60 70 L 35 80 Z"
            fill="url(#metalGradient)"
            stroke="#999"
            strokeWidth="1"
          />
          <path
            d="M 35 80 L 60 70 L 85 95"
            fill="none"
            stroke="#FFF"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>

        {/* Pivot screw */}
        <circle cx="60" cy="60" r="3" fill="url(#metalGradient)" stroke="#777" strokeWidth="1"/>
        <circle cx="60" cy="60" r="1.5" fill="#999"/>

        {/* Cutting effect line */}
        <line
          x1="75"
          y1="45"
          x2="75"
          y2="75"
          className="cutting-line"
          stroke="#FF6B6B"
          strokeWidth="2"
          opacity="0"
        />
      </g>
    </svg>
);


const Booking = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(timeSlots);

  const initialState: BookingState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(bookAppointment, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Booking Successful!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      toast({
        title: "Booking Failed",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch(`/api/available-slots?date=${selectedDate}`);
        if (response.ok) {
          const slots = await response.json();
          setAvailableTimeSlots(slots);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setAvailableTimeSlots(timeSlots);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);


  const containerRef = useRef<HTMLDivElement>(null);
  const scissorRef = useRef<SVGSVGElement>(null);
  const bookingSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !scissorRef.current || !bookingSectionRef.current) return;

      gsap.set(bookingSectionRef.current, { opacity: 0, y: 100 });
      gsap.set(scissorRef.current, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 1000
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
        },
      });

      // Show the scissor (it will animate automatically with CSS)
      tl.set(scissorRef.current, { opacity: 1 }, 0);

      // Hide the scissor and show booking form
      tl.to(scissorRef.current, {
        opacity: 0,
        duration: 0.3,
      }, 2.5);

      tl.to(bookingSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className="h-screen w-full bg-background relative" id="animation-container">
         <ScissorIcon ref={scissorRef} className="w-32 h-32 md:w-40 md:h-40" />
      </div>

      <section id="booking" ref={bookingSectionRef} className="py-16 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
              <Card className="w-full max-w-2xl bg-card border-border">
                  <CardHeader className="text-center px-4 sm:px-6">
                      <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold">Book an Appointment</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                      <form ref={formRef} action={dispatch} className="space-y-6">
                        <div className="space-y-2 text-left">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" placeholder="Your Name" aria-describedby="name-error"/>
                          <div id="name-error" aria-live="polite" aria-atomic="true">
                              {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                          </div>
                        </div>
                        <div className="space-y-2 text-left">
                          <Label htmlFor="contact">Phone Number</Label>
                          <div className="flex">
                            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 text-gray-500 border-input">
                              +91
                            </div>
                            <Input
                              id="contact"
                              name="contact"
                              placeholder="10-digit phone number"
                              maxLength={10}
                              pattern="[0-9]{10}"
                              className="rounded-l-none"
                              aria-describedby="contact-error"
                              onInput={(e) => {
                                const target = e.target as HTMLInputElement;
                                target.value = target.value.replace(/[^0-9]/g, '');
                              }}
                            />
                          </div>
                           <div id="contact-error" aria-live="polite" aria-atomic="true">
                              {state.errors?.contact && <p className="text-sm font-medium text-destructive">{state.errors.contact[0]}</p>}
                          </div>
                        </div>
                        <div className="space-y-2 text-left">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            aria-describedby="date-error"
                          />
                           <div id="date-error" aria-live="polite" aria-atomic="true">
                              {state.errors?.date && <p className="text-sm font-medium text-destructive">{state.errors.date[0]}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2 text-left">
                            <Label htmlFor="service">Service</Label>
                             <Select name="service">
                                <SelectTrigger id="service" aria-describedby="service-error">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              <SelectContent>
                                  {services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                      {service}
                                  </SelectItem>
                                  ))}
                              </SelectContent>
                              </Select>
                             <div id="service-error" aria-live="polite" aria-atomic="true">
                             {state.errors?.service && <p className="text-sm font-medium text-destructive">{state.errors.service[0]}</p>}
                             </div>
                          </div>
                          <div className="space-y-2 text-left">
                            <Label htmlFor="timeSlot">Time Slot</Label>
                            <Select name="timeSlot">
                                <SelectTrigger id="timeSlot" aria-describedby="timeSlot-error">
                                  <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                              <SelectContent>
                                  {availableTimeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                      {slot}
                                  </SelectItem>
                                  ))}
                              </SelectContent>
                              </Select>
                              <div id="timeSlot-error" aria-live="polite" aria-atomic="true">
                              {state.errors?.timeSlot && <p className="text-sm font-medium text-destructive">{state.errors.timeSlot[0]}</p>}
                              </div>
                          </div>
                        </div>
                        <SubmitButton />
                      </form>
                  </CardContent>
              </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
