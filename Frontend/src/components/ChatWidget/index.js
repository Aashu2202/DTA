import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiMessageDetail } from 'react-icons/bi';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickSuggestions from './QuickSuggestions';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const containerVariants = {
  initial: { opacity: 0, y: 20, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.92 },
};

const buttonVariants = {
  scale: [1, 1.1, 1],
  transition: { duration: 0.4 },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
  }, [isOpen]);

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

      const res = await fetch(`${API_BASE_URL}/chat/`, {
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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-96 h-screen sm:h-[600px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
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
        {!isOpen && (
          <motion.button
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl focus:outline-none transition-all hover:from-indigo-600 hover:to-purple-700"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <FiMessageSquare className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
