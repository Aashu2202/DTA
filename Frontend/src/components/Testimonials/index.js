import React from 'react';
import { motion } from 'framer-motion';

// Import logos
import googleLogo from '../../assets/logos/naher_miles.png';
import microsoftLogo from '../../assets/logos/ambika_logo.png';
import amazonLogo from '../../assets/logos/sparsh_magic_logo.png';
import appleLogo from '../../assets/logos/ard_logo.png';
import metaLogo from '../../assets/logos/rcc_logo.png';
import netflixLogo from '../../assets/logos/savitt_logo.png';
import adobeLogo from '../../assets/logos/genesis_logo.png';
import salesforceLogo from '../../assets/logos/gonut_logo.png';

const logoData = [
  { id: 1, name: 'Google', logo: googleLogo },
  { id: 2, name: 'Microsoft', logo: microsoftLogo },
  { id: 3, name: 'Amazon', logo: amazonLogo },
  { id: 4, name: 'Apple', logo: appleLogo },
  { id: 5, name: 'Meta', logo: metaLogo },
  { id: 6, name: 'Netflix', logo: netflixLogo },
  { id: 7, name: 'Adobe', logo: adobeLogo },
  { id: 8, name: 'Salesforce', logo: salesforceLogo },
];

const LogoCard = ({ logo, name }) => (
  <div className="flex-shrink-0 px-4">
    <div className="group relative w-44 md:w-60 h-28 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center p-6 hover:-translate-y-1">
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
      />
    </div>
  </div>
);

export default function Testimonials() {
  // Split logos into two groups
  const row1 = [...logoData.slice(0, 4), ...logoData.slice(0, 4)];
  const row2 = [...logoData.slice(4, 8), ...logoData.slice(4, 8)];

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-white to-blue-50/20 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full"
          >
            OUR PARTNERS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Trusted By Leading Companies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            We collaborate with industry leaders to deliver data-driven solutions that power growth and innovation.
          </motion.p>
        </div>
      </div>

      {/* Marquee Containers */}
      <div className="relative flex flex-col gap-6 md:gap-10">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {row1.map((item, index) => (
              <LogoCard key={`row1-${item.id}-${index}`} {...item} />
            ))}
            {/* Duplicated for seamless loop */}
            {row1.map((item, index) => (
              <LogoCard key={`row1-dup-${item.id}-${index}`} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] whitespace-nowrap">
            {row2.map((item, index) => (
              <LogoCard key={`row2-${item.id}-${index}`} {...item} />
            ))}
            {/* Duplicated for seamless loop */}
            {row2.map((item, index) => (
              <LogoCard key={`row2-dup-${item.id}-${index}`} {...item} />
            ))}
          </div>
        </div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
      </div>
    </section>
  );
}

