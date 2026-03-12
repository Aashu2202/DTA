/*
  "Why Choose Us" highlights company strengths with icons
  and scroll-triggered animations.
*/
import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaShieldAlt, FaTrophy } from 'react-icons/fa';

const REASONS = [
  { icon: <FaUsers className="w-10 h-10 text-primary" />, title: 'Experienced Team', desc: 'Skilled professionals with deep industry knowledge.' },
  { icon: <FaCheckCircle className="w-10 h-10 text-primary" />, title: 'Proven Results', desc: '100+ successful projects across multiple sectors.' },
  { icon: <FaShieldAlt className="w-10 h-10 text-primary" />, title: 'Secure & Reliable', desc: 'Enterprise‑grade infrastructure and best practices.' },
  { icon: <FaTrophy className="w-10 h-10 text-primary" />, title: '24/7 Support', desc: 'Round‑the‑clock customer care and technical assistance.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Why Choose D-Table Analytics?
        </h2>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
          {REASONS.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
            >
              <div>{r.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {r.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
