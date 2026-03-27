/*
  Hero section with impactful headline, subtext, CTA buttons
  and animated gradient background.
  Uses Framer Motion for entrance animations and floating blobs.
*/
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../../data/servicesData';
import ServiceCard from '../ServiceCard';

export default function Hero() {
  const scrollRef = useRef(null);
  
  // Interaction & Scroll state refs (avoids re-renders during animation/drag)
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const lastMousePosRef = useRef(0);
  
  const animationRef = useRef(null);
  const idleTimeoutRef = useRef(null);

  // Use 3 copies for perfect infinite bi-directional scrolling
  const extendedServices = [...servicesData, ...servicesData, ...servicesData];

  // Pause interaction helper
  const pauseAutoScroll = () => {
    isPausedRef.current = true;
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
  };

  // Resume interaction helper with delay
  const resumeAutoScroll = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    // Set a short idle delay before resuming (1.5 seconds)
    idleTimeoutRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        isPausedRef.current = false;
      }
    }, 1500);
  };

  useEffect(() => {
    // Initialize scroll position to the start of the second set (1/3 of total width)
    if (scrollRef.current && scrollRef.current.scrollLeft === 0) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }

    let lastTimestamp = 0;
    const speed = 0.04; // pixel/ms speed
    
    const autoScroll = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      if (scrollRef.current) {
        const singleSetWidth = scrollRef.current.scrollWidth / 3;
        
        if (!isPausedRef.current && !isDraggingRef.current) {
          scrollRef.current.scrollLeft += speed * deltaTime;
        }

        // Endless loop logic
        // If we scroll past the end of the second set, jump back exactly one set-width
        if (scrollRef.current.scrollLeft >= singleSetWidth * 2) {
          scrollRef.current.scrollLeft -= singleSetWidth;
        } 
        // If user manually scrolls back past the start of the second set, jump forward
        else if (scrollRef.current.scrollLeft <= 0) {
          scrollRef.current.scrollLeft += singleSetWidth;
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };
    
    animationRef.current = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  // Global mouse handlers for robust dragging outside the container
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDraggingRef.current || !scrollRef.current) return;
      e.preventDefault(); 
      
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.5; 
      
      scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
      
      dragDistanceRef.current += Math.abs(e.pageX - lastMousePosRef.current);
      lastMousePosRef.current = e.pageX;
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        resumeAutoScroll();
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    lastMousePosRef.current = e.pageX;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    pauseAutoScroll();
  };

  const handleClickCapture = (e) => {
    if (dragDistanceRef.current > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between text-center min-h-[85vh] lg:min-h-[80vh] bg-[#004aad] overflow-hidden"
    >
      {/* Premium background depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-indigo-400 opacity-90" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* animated shapes */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
        animate={{ x: [-100, 100, -100], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        animate={{ x: [100, -100, 100], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top Section: Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 pt-8 pb-2 px-4">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Business with AI-Driven Data Intelligence
        </motion.h1>
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-xl px-4 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Empowering companies with powerful analytics, automation, and
          intelligent insights to make data‑informed decisions.
        </motion.p>
      </div>

      {/* Bottom Section: Scrolling Service Cards Marquee */}
      <div className="w-full pb-8 pt-2 z-10 relative overflow-hidden group">
        {/* Left Fade Mask */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
        
        {/* Right Fade Mask */}
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-indigo-400 to-transparent z-20 pointer-events-none" />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none py-4"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={() => {
            if (!isDraggingRef.current) resumeAutoScroll();
          }}
          onTouchStart={() => {
            pauseAutoScroll();
            dragDistanceRef.current = 0;
          }}
          onTouchEnd={resumeAutoScroll}
          onMouseDown={handleMouseDown}
          onClickCapture={handleClickCapture}
        >
          {extendedServices.map((service, idx) => (
            <div key={idx} className="flex-shrink-0 px-3">
               <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
