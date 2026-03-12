import { FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function ChatInput({ value, onChange, onSubmit, disabled }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + 'px';
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/80 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/80 p-4 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg"
    >
      <div className="flex items-end gap-3">
        {/* Input field */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask something..."
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 dark:focus:ring-offset-0 resize-none transition-all shadow-sm hover:shadow-md focus:shadow-md disabled:opacity-60 disabled:cursor-not-allowed max-h-24 overflow-hidden"
            rows="1"
          />
          {value && <div className="absolute top-3 right-3 text-xs text-gray-400">{value.length}</div>}
        </div>

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <FiSend className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-4">
        Shift + Enter for new line
      </p>
    </form>
  );
}
