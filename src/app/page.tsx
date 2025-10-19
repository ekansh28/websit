import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import About from '@/components/landing/about';
import Gallery from '@/components/landing/gallery';
import Booking from '@/components/landing/booking';
import Footer from '@/components/landing/footer';
import ScrollAnimation from '@/components/landing/scroll-animation';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Gallery />
        <ScrollAnimation />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
