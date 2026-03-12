/*
  Stats section displays animated counters that increment when
  scrolled into view. Uses Framer Motion's useInView hook.
*/
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ITEMS = [
  { label: 'Clients', value: 500 },
  { label: 'Reports Generated', value: 1200 },
  { label: 'Accuracy', value: 99, suffix: '%' },
  { label: 'Automation Uptime', value: 24, suffix: '/7' },
];

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
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-soft dark:shadow-soft-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Counter value={item.value} suffix={item.suffix} />
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
