import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/images/about_us.png';

const AboutUs = () => {
  const highlights = [
    {
      icon: "🚀",
      title: "Founded in 2020",
      description: "Starting our journey to bridge the gap between complex data and business growth."
    },
    {
      icon: "💡",
      title: "AI & Automation Focus",
      description: "Helping businesses evolve with modern, smart, and efficient digital systems."
    },
    {
      icon: "📊",
      title: "Grounded in Analytics",
      description: "Delivering intuitive dashboards and tools that provide real, actionable insights."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Column: Image/Visual */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                <motion.img
                  src={aboutImage}
                  alt="D-Table Analytics Innovation"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-50 dark:border-gray-700 hidden sm:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">
                    4+
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-none">Years of</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Innovation</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              About Us
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Driving Business Growth with <span className="text-primary">Data Excellence</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Founded in 2020, D-Table Analytics is a growing startup dedicated to helping businesses navigate the digital landscape. We focus on delivering practical AI solutions, automation, and dashboards that simplify complex data into clear, actionable steps.
            </p>

            <div className="space-y-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-10" whileHover={{ x: 5 }}>
              <a
                href="/services"
                className="inline-flex items-center text-primary font-bold hover:underline"
              >
                View our solutions
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
