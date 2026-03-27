import { FiX } from 'react-icons/fi';
import { SiOpenai } from 'react-icons/si';
import { motion } from 'framer-motion';
export default function ChatHeader({ onClose }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white px-6 py-5 shadow-lg relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 animate-pulse" />

      <div className="relative flex items-center justify-between">
        {/* Left: Icon and Title */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-xl"
          >
            <SiOpenai className="w-5 h-5" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">D-Table AI</h2>
            <p className="text-xs text-indigo-100 font-medium">Smart Analytics Assistant</p>
          </div>
        </div>

        {/* Right: Close button */}
        <motion.button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          <FiX className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
