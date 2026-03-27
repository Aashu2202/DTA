import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickSuggestions from './QuickSuggestions';
import { API_BASE_URL } from '../../config';

const API_BASE = `${API_BASE_URL}/api/v1`;

const containerVariants = {
  initial: { opacity: 0, y: 20, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.92 },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userPurpose, setUserPurpose] = useState(null); // "business" or "hiring"
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    let showTimeoutId;
    let hideTimeoutId;

    const runLoop = () => {
      setShowLabel(true);
      showTimeoutId = setTimeout(() => {
        setShowLabel(false);
        const hideDuration = 5000 + Math.random() * 2000;
        hideTimeoutId = setTimeout(runLoop, hideDuration);
      }, 5000);
    };

    if (!isOpen) {
      // Start loop when chat is closed or on mount
      hideTimeoutId = setTimeout(runLoop, 1000);
    } else {
      setShowLabel(false);
    }

    return () => {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, [isOpen]);

  // when opening chat or resetting purposes, initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: 'Welcome to D-Table Analytics. Please tell us your purpose for visiting.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setShowSuggestions(true);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (text, purpose = null) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), text, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    if (showSuggestions) setShowSuggestions(false);

    try {
      const payload = { user_id: 'guest', message: text, is_user: false };
      if (purpose) payload.purpose = purpose;

      const res = await fetch(`${API_BASE}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const botMsg = { id: Date.now() + 1, text: data.message || "Couldn't process.", isUser: false, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now() + 2, text: 'Something went wrong.', isUser: false, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue, userPurpose);
  };

  const handleSuggestionClick = (s) => {
    // first purpose selection
    if (!userPurpose) {
      const normalized = s.toLowerCase().includes('business') ? 'business' : 'hiring';
      setUserPurpose(normalized);
      // send purpose selection to server for context
      sendMessage(s, normalized);
      // manually add acknowledgement
      const ack = normalized === 'business'
        ? 'Great! I can help you with our services, technologies, and company details.'
        : 'I can guide you about job openings, internships, and the hiring process.';
      setMessages((prev) => [...prev, { id: Date.now() + 3, text: ack, isUser: false, timestamp: new Date() }]);
      setShowSuggestions(false);
    } else {
      // normal suggestion
      sendMessage(s, userPurpose);
    }
  };

  return (
    <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-[calc(100vw-1rem)] max-w-[384px] h-[70vh] sm:h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
            initial={containerVariants.initial}
            animate={containerVariants.animate}
            exit={containerVariants.exit}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ChatHeader onClose={() => setIsOpen(false)} />
            <div className="flex-1 overflow-y-auto space-y-3 p-4 scrollbar-thin bg-gradient-to-b from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
              {showSuggestions && (
                <QuickSuggestions
                  suggestions={
                    !userPurpose
                      ? ['Business Purpose', 'Hiring / Career Purpose']
                      : userPurpose === 'business'
                      ? ['What services do you provide?', 'Technologies used', 'Contact details']
                      : ['Job openings', 'Internship opportunities', 'Application process']
                  }
                  onSelect={handleSuggestionClick}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center space-x-2">
              <ChatInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSubmit={handleSend}
                disabled={isLoading}
              />
              {userPurpose && (
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => {
                    // ask to change purpose
                    setUserPurpose(null);
                    setMessages((prev) => [
                      ...prev,
                      { id: Date.now(), text: 'Would you like to change your purpose?', isUser: false, timestamp: new Date() },
                    ]);
                    setShowSuggestions(true);
                  }}
                >
                  Change purpose
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLabel && !isOpen && (
          <motion.div
            className="hidden sm:flex absolute right-[4.5rem] sm:right-[5.25rem] bottom-[10px] sm:bottom-[13px] items-center justify-center bg-white/95 backdrop-blur-md dark:bg-gray-800/95 text-indigo-700 dark:text-purple-300 px-5 py-2.5 rounded-full shadow-lg shadow-indigo-500/10 dark:shadow-purple-900/20 cursor-pointer border border-indigo-100/50 dark:border-purple-700/30 hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={() => setIsOpen(true)}
          >
            <span className="text-sm font-medium tracking-wide whitespace-nowrap">Ask D-Table AI</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Subtle Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/40 dark:bg-purple-500/40 pointer-events-none"
              animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Main Button */}
            <motion.button
              className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl focus:outline-none transition-colors hover:from-indigo-600 hover:to-purple-700 z-10"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageSquare className="w-7 h-7" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
