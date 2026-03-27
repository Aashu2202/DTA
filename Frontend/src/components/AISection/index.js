/*
  AI Assistant promo section with mockup and call-to-action.
  Animations slide elements into view on scroll.
*/
import { motion } from 'framer-motion';

export default function AISection() {
  return (
    <section id="ai" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Powered by Intelligent Automation
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Our AI assistant leverages cutting-edge machine learning to deliver
            insights, automate workflows, and answer your questions in real time.
          </p>
          <a
            href="#contact"
            className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-2xl shadow hover:bg-indigo-600 transition"
          >
            Try the AI Assistant
          </a>
        </motion.div>
        <motion.div
          className="order-1 md:order-2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* placeholder image or mockup */}
          <div className="w-full max-w-md h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}
