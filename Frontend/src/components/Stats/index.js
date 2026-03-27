/*
  Stats section displays animated counters that increment when
  scrolled into view. Uses Framer Motion's useInView hook.
  Now dynamically fetched from the Stats CMS API.
*/
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaFileAlt, FaCheckCircle, FaClock, FaTrophy, FaBolt, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';

const ICON_MAP = {
  users: <FaUsers />,
  file: <FaFileAlt />,
  check: <FaCheckCircle />,
  clock: <FaClock />,
  trophy: <FaTrophy />,
  bolt: <FaBolt />,
  shield: <FaShieldAlt />,
  globe: <FaGlobe />
};

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 50);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setItems(data.items || []);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || items.length === 0) {
    return null; // Or a skeleton loader if preferred
  }

  return (
    <section id="stats" className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[30%] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact in <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Numbers</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We take pride in delivering measurable results and maintaining the highest standards of accuracy and reliability for our clients.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={`group relative p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 border-t-2 ${item.highlight
                  ? 'bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/40 border-t-blue-500'
                  : 'bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm border-t-gray-100 dark:border-t-gray-700'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1
              }}
            >
              {/* Icon Decoration */}
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm shadow-blue-500/10">
                {ICON_MAP[item.icon] || <FaGlobe />}
              </div>

              <div className="flex flex-col">
                <Counter value={item.value} suffix={item.suffix} />
                <p className="mt-2 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-sm">
                  {item.label}
                </p>
                {item.description && (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 leading-tight">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
