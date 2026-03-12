/*
  Hero section with impactful headline, subtext, CTA buttons
  and animated gradient background.
  Uses Framer Motion for entrance animations and floating blobs.
*/
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center h-screen bg-gradient-to-br from-primary to-indigo-400 overflow-hidden"
    >
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

      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-white z-10 leading-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Transform Your Business with AI-Driven Data Intelligence
      </motion.h1>
      <motion.p
        className="mt-4 text-lg sm:text-2xl text-white max-w-2xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Empowering companies with powerful analytics, automation, and
        intelligent insights to make data‑informed decisions.
      </motion.p>
      <motion.div
        className="mt-8 flex space-x-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <a
          href="#contact"
          className="px-6 py-3 bg-white text-primary font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-primary transition"
        >
          Talk to Expert
        </a>
      </motion.div>
    </section>
  );
}
