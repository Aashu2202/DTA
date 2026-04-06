import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBack}
          className="group flex items-center gap-2 mb-8 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium text-sm"
        >
          <HiArrowNarrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <header className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-6">
              Legal & Privacy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Last Updated: April 6, 2026
            </p>
          </header>

          <div className="space-y-10 prose prose-indigo dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                At D-Table Analytics, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information Collection</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We collect information that you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Submit a contact inquiry form</li>
                <li>Apply for a career opportunity</li>
                <li>Request a consultation or demo</li>
                <li>Communicate with us via email or phone</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Use of Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Respond to your inquiries and offer customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-600">
                <p className="font-semibold text-gray-900 dark:text-white">D-Table Analytics</p>
                <p className="text-gray-600 dark:text-gray-400">Email: info@dtableanalytics.com</p>
                <p className="text-gray-600 dark:text-gray-400">Address: 1st Floor, Kolar Castle, 101, Chuna Bhatti Square, Bhopal, MP 462039</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
