import Navbar from '@/components/Navbar';
import MobileDock from '@/components/MobileDock';
import Hero from '@/components/Hero';
import Roles from '@/components/Roles';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <MobileDock />

      <main>
        <Hero />
        <Roles />
        <Experience />
        <About />
        <Projects />
      </main>

      <Footer />
    </>
  );
}
