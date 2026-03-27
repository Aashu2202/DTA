import React, { useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import ServiceBlock from '../components/Services/ServiceBlock';
import { FiMessageSquare } from 'react-icons/fi';
import { API_BASE_URL } from '../config';
const ServicesPage = () => {
  const [isRestoring, setIsRestoring] = useState(() => !!sessionStorage.getItem('scrollTargetServiceId'));
  const [services, setServices] = useState(servicesData); // Default fallback to static

  useLayoutEffect(() => {
    if (isRestoring) {
      const scrollTargetId = sessionStorage.getItem('scrollTargetServiceId');
      if (scrollTargetId) {
        const element = document.getElementById(scrollTargetId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        sessionStorage.removeItem('scrollTargetServiceId');
      }
      // Drop the overlay mask in the exact same synchronous render frame
      setIsRestoring(false);
    }
    // The previous 'else' block containing fallback top-scrolling was removed.
    // Fresh visit scrolling is now strictly governed universally by ScrollToTop.js
  }, [isRestoring]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/services`);
        if (response.ok) {
          const list = await response.json();
          const mapped = list.map(dbItem => {
            const staticMatch = servicesData.find(s => s.id === dbItem.slug || s.title === dbItem.title);
            return {
              ...dbItem,
              id: dbItem.slug,
              icon: staticMatch?.icon // map static icon for backward compatibility
            };
          });
          setServices(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch services, using static fallback.");
      }
    };
    fetchServices();
  }, []);

  return (
    <div id="services" className="bg-white dark:bg-gray-900 relative">
      {/* Global Viewport Mask Overlay - Covers Navbar & Footer during the split-second restore jump */}
      {isRestoring && (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900" />
      )}

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Empowering your business with cutting-edge data solutions, automation,
              and strategic insights designed for the modern enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Showcase */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {services.map((service, index) => (
          <ServiceBlock key={service.id || service.slug} service={service} index={index} />
        ))}
      </div>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to Transform Your <br className="hidden md:block" /> Business Operations?
            </h2>
            <p className="text-xl text-white/90 font-medium">
              Join dozens of enterprises leveraging D-Table Analytics for smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-2xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Schedule a Demo
              </a>
              <a
                href="/#contact"
                className="px-8 py-4 bg-primary border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiMessageSquare className="w-5 h-5" />
                Talk on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
