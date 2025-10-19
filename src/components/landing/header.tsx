import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-white">DNA Salon</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-foreground/80 transition-colors hover:text-foreground font-medium">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="#booking">Book Appointment</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-16">
                <Link href="#home" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="font-headline text-2xl font-bold">DNA Salon</span>
                </Link>
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
                 <Button asChild variant="outline" className="mt-4">
                  <Link href="#booking">Book Appointment</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
