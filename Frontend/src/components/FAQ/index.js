/*
  FAQ accordion component with premium card-based design,
  smooth animations, and interactive hover states.
*/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/v1/faqs');
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-14 bg-blue-50/30 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3"
          >
            Got Questions? <span className="text-indigo-600 dark:text-indigo-400">We’ve Got Answers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know about our services, integrations, and how we can help your business grow through data-driven insights.
          </motion.p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Loading answers for you...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20">
              <p className="text-red-600 dark:text-red-400 font-medium">Unable to load FAQs at the moment. Please try again later.</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-10 bg-indigo-50/50 dark:bg-gray-800/50 rounded-3xl border border-indigo-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No FAQs available yet.</p>
            </div>
          ) : (
            faqs.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-3xl border ${openIndex === idx
                    ? 'border-indigo-200 dark:border-indigo-500/30 shadow-xl shadow-indigo-500/5'
                    : 'border-gray-100 dark:border-gray-700 shadow-soft hover:shadow-md'
                  } transition-all duration-300 overflow-hidden`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className={`text-base font-bold transition-colors duration-300 ${openIndex === idx ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'
                    }`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-1.5 rounded-full transition-colors ${openIndex === idx ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'
                      }`}
                  >
                    <HiChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-gray-700/50 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
