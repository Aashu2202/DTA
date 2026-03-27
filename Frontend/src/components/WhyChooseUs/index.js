/*
  "Why Choose Us" highlights company strengths with icons
  and scroll-triggered animations.
*/
import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaShieldAlt, FaTrophy } from 'react-icons/fa';
import whyUsVisual from '../../assets/why-us-visual.png';

const REASONS = [
  { icon: <FaUsers className="w-8 h-8 md:w-10 md:h-10" />, title: 'Experienced Team', desc: 'Skilled professionals with deep industry knowledge.' },
  { icon: <FaCheckCircle className="w-8 h-8 md:w-10 md:h-10" />, title: 'Proven Results', desc: '100+ successful projects across multiple sectors.' },
  { icon: <FaShieldAlt className="w-8 h-8 md:w-10 md:h-10" />, title: 'Secure & Reliable', desc: 'Enterprise‑grade infrastructure and best practices.' },
  { icon: <FaTrophy className="w-8 h-8 md:w-10 md:h-10" />, title: '24/7 Support', desc: 'Round‑the‑clock support for your critical systems.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[5%] w-[30%] h-[30%] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Side: Content & Cards */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left mb-12"
            >
              <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 shadow-sm">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Trusted by Industry Leaders</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Why Choose <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">D-Table Analytics?</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                We bridge the gap between complex data and strategic business decisions with enterprise-grade solutions.
              </p>
            </motion.div>

            {/* Cards Composition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {REASONS.map((r, i) => (
                <motion.div
                  key={i}
                  className="group relative flex flex-col items-start p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: i * 0.1
                  }}
                >
                  {/* Icon Badge */}
                  <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <div className="text-blue-600 dark:text-blue-400">
                      {r.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-poppins">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                    {r.desc}
                  </p>

                  {/* Decorative Accent */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Supportive Visual */}
          <motion.div
            className="relative order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-gray-800 group">
              {/* Image with subtle floating animation and hover zoom */}
              <motion.img
                src={whyUsVisual}
                alt="AI and Data Visualization"
                className="w-full h-auto object-cover"
                animate={{
                  y: [0, -10, 0],
                }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none" />
            </div>

            {/* Trust Points Mini-labels */}
            <div className="absolute -bottom-6 -left-6 hidden md:flex flex-col gap-3">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-blue-50 dark:border-gray-700 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tighter text-nowrap">Enterprise Ready</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-blue-50 dark:border-gray-700 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tighter text-nowrap">AI Powered</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
