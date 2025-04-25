// app/page.js
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Packages from '@/components/sections/Packages';
import TaxiServices from '@/components/sections/TaxiServices';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Packages />
      <TaxiServices />
      <Testimonials />
    </main>
  );
}