import Link from "next/link";
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card py-8 sm:py-12">
      <div className="container mx-auto px-4 md:px-6 text-foreground/80">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">Contact Us</h3>
            <p>123 Beauty Lane, Style City, 12345</p>
            <p>Email: contact@dnasalon.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">Working Hours</h3>
            <p>Monday - Friday: 9:00 AM - 10:00 PM</p>
            <p>Saturday: 10:00 AM - 8:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">Follow Us</h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <Link href="#" aria-label="Facebook" className="hover:text-white"><Facebook /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-white"><Twitter /></Link>
              <Link href="#" aria-label="Instagram" className="hover:text-white"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <Link href="/privacy" className="text-sm hover:text-white transition-colors underline">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-border/50">•</span>
            <Link href="/admin" className="text-sm hover:text-white transition-colors underline">
              Admin Dashboard
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} DNA Salon. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
