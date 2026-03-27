// import logo from './logo.svg';
import './index.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// redesigned components
import MainLayout from './components/MainLayout';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import WhyChooseUs from './components/WhyChooseUs';
import Stats from './components/Stats';

import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

import Careers from './pages/Careers';
import ServiceDetail from './pages/ServiceDetail';
import ServicesPage from './pages/ServicesPage';

// admin pages
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import JobsManager from './pages/admin/JobsManager';
import JobForm from './pages/admin/JobForm';
import ServicesManager from './pages/admin/ServicesManager';
import ServiceForm from './pages/admin/ServiceForm';
import FAQsManager from './pages/admin/FAQsManager';
import FAQForm from './pages/admin/FAQForm';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import TestimonialForm from './pages/admin/TestimonialForm';
import StatsManager from './pages/admin/StatsManager';

// Home page component
function HomePage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Handle hash-based scrolling
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <AboutUs />
      <WhyChooseUs />
      <Stats />

      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="antialiased">
        <Routes>
          {/* Public Routes wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="jobs" element={<JobsManager />} />
            <Route path="jobs/new" element={<JobForm />} />
            <Route path="jobs/edit/:id" element={<JobForm />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/edit/:id" element={<ServiceForm />} />
            <Route path="faqs" element={<FAQsManager />} />
            <Route path="faqs/new" element={<FAQForm />} />
            <Route path="faqs/edit/:id" element={<FAQForm />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="testimonials/new" element={<TestimonialForm />} />
            <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
            <Route path="stats" element={<StatsManager />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
