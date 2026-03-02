import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiMessageDetail, BiSend } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import './Chatbot.css';

const API_BASE_URL = "http://127.0.0.1:8000/api/v1"; // Match with your FastAPI standard endpoint

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm the D-Table Analytics AI assistant. How can I help you today?", isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const messageText = inputValue.trim();
        if (!messageText) return;

        // Add user message to UI
        const newUserMsg = { id: Date.now(), text: messageText, isUser: true };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Call FastAPI Backend
            const response = await fetch(`${API_BASE_URL}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: "guest",
                    message: messageText,
                    is_user: false
                }),
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.status}`);
            }

            const data = await response.json();

            // Add bot message to UI
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: data.message || "I couldn't process your request.",
                isUser: false
            }]);

        } catch (error) {
            console.error('Error fetching chat response:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Sorry, I am having trouble connecting to the server. Please try again later.",
                isUser: false
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <div className="chatbot-logo">DTA</div>
                                <div>
                                    <h3 className="chatbot-title">Ask AI Assistance</h3>
                                    <p className="chatbot-status">Online</p>
                                </div>
                            </div>
                            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                                <IoMdClose />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="chatbot-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                                    {msg.text}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                className="chatbot-input"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="chatbot-send"
                                disabled={!inputValue.trim() || isLoading}
                            >
                                <BiSend size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    className="chatbot-button"
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <BiMessageDetail />
                </motion.button>
            )}
        </div>
    );
};

export default Chatbot;
