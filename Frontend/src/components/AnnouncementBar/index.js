import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiStar } from 'react-icons/fi';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
          className="relative mt-16 w-full h-9 bg-gradient-to-r from-primary via-indigo-600 to-primary backdrop-blur-sm z-40 flex items-center overflow-hidden border-b border-white/10 shadow-sm"
        >
          <div className="relative w-full h-full flex items-center justify-center px-10">
            <motion.div
              className="whitespace-nowrap flex items-center gap-4 text-white font-medium text-sm md:text-base"
              initial={{ x: '-100vw' }}
              animate={{ x: ['-100vw', '0vw', '0vw', '100vw'] }}
              transition={{
                duration: 10,
                times: [0, 0.4, 0.6, 1],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="flex items-center gap-2">
                <FiStar className="text-yellow-300 w-3.5 h-3.5" />
                <span>We Are Hiring — Explore exciting opportunities at D-Table Analytics</span>
              </span>
              <Link
                to="/careers"
                className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] md:text-xs font-bold hover:bg-white hover:text-primary transition-all duration-300 shadow-sm whitespace-nowrap"
              >
                View Careers
              </Link>
            </motion.div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              aria-label="Close announcement"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
      {!isVisible && (
        <div className="mt-16" /> // Maintain the gap for the fixed navbar even when bar is closed
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
