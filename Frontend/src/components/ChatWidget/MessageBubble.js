import { SiOpenai } from 'react-icons/si';
import { motion } from 'framer-motion';

const messageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function MessageBubble({ message, isUser, timestamp }) {
  const timeString = timestamp?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <SiOpenai className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      {/* Message bubble */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs`}>
        <motion.div
          className={`relative px-4 py-3 rounded-2xl shadow-md transition-all group ${
            isUser
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none'
              : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Message text */}
          <p className="text-sm leading-relaxed break-words whitespace-pre-line">{message}</p>
        </motion.div>

        {/* Timestamp */}
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">{timeString}</span>
      </div>

      {/* Spacing for user messages */}
      {isUser && <div className="w-8" />}
    </motion.div>
  );
}
