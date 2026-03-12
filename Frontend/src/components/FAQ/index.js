/*
  FAQ accordion component with smooth open/close animations
  courtesy of Framer Motion's AnimatePresence.
*/
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const QA = [
  { q: 'How do I get started?', a: 'Click the "Get Started" button or contact us through the form.' },
  { q: 'What services do you offer?', a: 'We provide data management, BI, WhatsApp automation, and more.' },
  { q: 'Do you support custom integrations?', a: 'Yes, we tailor solutions to each client’s needs.' },
  { q: 'Is there a trial period?', a: 'Please contact our sales team for information on trials and pricing.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {QA.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 dark:border-gray-700">
              <button
                className="w-full flex justify-between items-center py-4 text-left text-gray-800 dark:text-gray-100 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{item.q}</span>
                {openIndex === idx ? <HiChevronUp /> : <HiChevronDown />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
