/*
  Services section presents offerings as interactive cards.
  Each card animates on hover and scroll using Framer Motion.
*/
import { motion } from 'framer-motion';
import { FiDatabase, FiBarChart, FiClock, FiMessageSquare } from 'react-icons/fi';

const SERVICES = [
  {
    icon: <FiDatabase className="w-12 h-12 text-primary" />, 
    title: 'Data Management',
    desc: 'Collection, storage, ETL and real‑time synchronization of your data.',
  },
  {
    icon: <FiBarChart className="w-12 h-12 text-primary" />,
    title: 'Business Intelligence',
    desc: 'Custom dashboards, reporting, forecasting and KPI monitoring.',
  },
  {
    icon: <FiMessageSquare className="w-12 h-12 text-primary" />,
    title: 'WhatsApp Automation',
    desc: 'Automate customer communication, notifications and campaigns.',
  },
  {
    icon: <FiClock className="w-12 h-12 text-primary" />,
    title: '24/7 Support',
    desc: 'Reliable operations and monitoring around the clock.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Our Services
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Comprehensive solutions to help your business grow.
        </p>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-soft dark:shadow-soft-dark cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
