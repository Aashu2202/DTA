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

export default function Testimonials() {
  // Split logos into two groups for the two cards
  const firstGroup = logoData.slice(0, 4);
  const secondGroup = logoData.slice(4, 8);

  // Note: This section is temporary until dynamic testimonials are available.

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full"
          >
            Our Partners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
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
            We are proud to collaborate with industry leaders around the globe, providing cutting-edge data analytics solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {[firstGroup, secondGroup].map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * groupIndex }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
            >
              {/* Card Title or Category (Optional) */}
              <div className="grid grid-cols-2 gap-8 md:gap-12 h-full">
                {group.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="max-h-12 w-auto object-contain transition-all duration-500 cursor-pointer hover:scale-110 hover:-translate-y-2 drop-shadow-sm hover:drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
