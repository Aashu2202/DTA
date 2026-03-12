// import logo from './logo.svg';
import './index.css';
import { useEffect } from 'react';

// redesigned components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Stats from './components/Stats';
import AISection from './components/AISection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';



function App() {
  // ensure scroll restoration or custom effects if needed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Stats />
        <AISection />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}


export default App;
