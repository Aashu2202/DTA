/*
  Services section presents offerings as interactive cards.
  Each card animates on hover and scroll using Framer Motion.
*/
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../../data/servicesData';

export default function Services() {
  const navigate = useNavigate();
  // Selection of 4 key services for the homepage
  const SELECTED_SERVICES = [
    servicesData.find(s => s.id === 'ai-agents-chatbots'),
    servicesData.find(s => s.id === 'business-process-automation'),
    servicesData.find(s => s.id === 'looker-studio-dashboards'),
    servicesData.find(s => s.id === 'whatsapp-automation')
  ].filter(Boolean);

  return (
    <section id="services" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Our Services
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Comprehensive AI and data solutions to empower your modern business.
        </p>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SELECTED_SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-soft dark:shadow-soft-dark cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all"
              onClick={() => navigate(`/services/${s.id}`)}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-4">
                {s.icon && <s.icon className="w-12 h-12 text-primary" />}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {s.shortDesc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
