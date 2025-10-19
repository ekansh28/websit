"use client";

import { useEffect, useRef } from "react";
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

const services = [
  "Hair Cut", "Spa", "Facial", "Hair Wash", "Hair Color", "Hair Treatment", "Wax", "Others",
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 22; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
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

const Booking = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
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

  return (
    <section id="booking" className="py-16 md:py-32 bg-background">
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
                        <Label htmlFor="contact">Contact Details</Label>
                        <Input id="contact" name="contact" placeholder="Phone or Email" aria-describedby="contact-error"/>
                         <div id="contact-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.contact && <p className="text-sm font-medium text-destructive">{state.errors.contact[0]}</p>}
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
                                {timeSlots.map((slot) => (
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
  );
};

export default Booking;
