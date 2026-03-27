import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export default function QuickSuggestions({ suggestions = [], onSelect }) {
  return (
    <motion.div
      className="space-y-2"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
        Quick suggestions
      </p>
      <div className="space-y-2">
        {suggestions.map((s, idx) => (
          <motion.button
            key={idx}
            onClick={() => onSelect(s)}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group text-left px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-indigo-200/50 dark:border-gray-500/50 hover:border-indigo-300 dark:hover:border-gray-400 text-gray-700 dark:text-gray-100 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium truncate">{s}</span>
              <FiArrowRight className="w-4 h-4 text-indigo-500 dark:text-purple-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
