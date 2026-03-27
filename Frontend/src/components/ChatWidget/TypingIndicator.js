import { motion } from 'framer-motion';
import { SiOpenai } from 'react-icons/si';

export default function TypingIndicator() {
  const dotVariants = {
    animate: (i) => ({
      y: [0, -12, 0],
      transition: {
        duration: 1,
        delay: i * 0.15,
        repeat: Infinity,
      },
    }),
  };

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md animate-pulse">
          <SiOpenai className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Typing dots */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"
            variants={dotVariants}
            custom={i}
            animate="animate"
          />
        ))}
      </div>
    </motion.div>
  );
}
