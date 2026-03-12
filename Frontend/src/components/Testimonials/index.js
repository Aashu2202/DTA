/*
  Testimonials grid with client quotes and staggered reveal
  for a polished user experience.
*/
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Jane Doe',
    role: 'CTO, TechCorp',
    quote: 'D-Table transformed our data pipeline and gave us insights we didn\'t know existed.',
  },
  {
    name: 'John Smith',
    role: 'Head of Ops, RetailCo',
    quote: 'The automation saved us countless hours. Support is always responsive.',
  },
  {
    name: 'Emily R.',
    role: 'CEO, HealthPlus',
    quote: 'Their analytics dashboards are intuitive and powerful.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          What Our Clients Say
        </h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-soft dark:shadow-soft-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-gray-600 dark:text-gray-300 italic">"{t.quote}"</p>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
