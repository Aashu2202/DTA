/*
  Contact section includes company info and a contact form.
  Form submission uses EmailJS; tailwind for styling.
*/
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLocation, IoMail, IoCall } from 'react-icons/io5';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    reason: '',
    message: '',
    phone: '91',
  });

  const [loader, setLoader] = useState(false);

  const showToastMessage = (type) => {
    const position = 'top-right';
    switch (type) {
      case 'success':
        toast.success('Message sent successfully!', { position });
        break;
      case 'error':
        toast.error('Error sending message. Please try again.', { position });
        break;
      case 'warning':
        toast.warning('Please enter a valid email address.', { position });
        break;
      default:
        toast.info('Please fill all required fields.', { position });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      showToastMessage('warning');
      setLoader(false);
      return;
    }

    const phoneVal = formData.phone || '';
    if (!/^91[6-9]\d{9}$/.test(phoneVal)) {
      toast.error('Please enter a valid 10-digit Indian mobile number.', { position: 'top-right' });
      setLoader(false);
      return;
    }

    const formattedPhone = '+' + phoneVal;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company_name: formData.companyName,
          phone: formattedPhone,
          reason: formData.reason,
          message: formData.message,
        }),
      });

      if (response.ok) {
        showToastMessage('success');
        setFormData({
          name: '',
          email: '',
          companyName: '',
          reason: '',
          message: '',
          phone: '91',
        });
      } else {
        showToastMessage('error');
      }
    } catch (error) {
      showToastMessage('error');
    } finally {
      setLoader(false);
    }
  };

  const contactInfo = [
    {
      icon: <IoLocation className="w-6 h-6" />,
      title: 'Our Location',
      content: 'Bhopal, Madhya Pradesh, India',
    },
    {
      icon: <IoCall className="w-6 h-6" />,
      title: 'Call Us',
      content: '+91 87702 40025',
      link: 'tel:+918770240025',
    },
    {
      icon: <IoMail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'info@dtableanalytics.com',
      link: 'mailto:info@dtableanalytics.com',
    },
    {
      icon: <IoMail className="w-6 h-6" />,
      title: 'For more queries',
      content: 'bd@dtableanalytics.com',
      link: 'mailto:bd@dtableanalytics.com',
    },
  ];


  return (
    <section id="contact" className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -z-10" />

      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Info & Trust */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Let’s Build Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  Great Together
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
                Have a project in mind or need expert data solutions? Get in touch with our team today.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a href={info.link} className="text-xl font-medium text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-xl font-medium text-gray-900 dark:text-white">
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Premium Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:mt-0"
          >
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Optional"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                    <div className="w-full phone-input-container">
                      <PhoneInput
                        country={'in'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        containerClass="w-full"
                        inputClass="!w-full !px-5 !py-6 !rounded-xl !border !border-gray-200 dark:!border-gray-600 !bg-gray-50 dark:!bg-gray-700 !text-gray-900 dark:!text-white focus:!outline-none focus:!ring-2 focus:!ring-indigo-500/20 focus:!border-indigo-500 !transition-all"
                        buttonClass="!border-none !bg-transparent !rounded-l-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Inquiry Reason</label>
                  <input
                    type="text"
                    name="reason"
                    placeholder="e.g. Data Analytics Consulting"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loader}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:shadow-indigo-300 transition-all flex items-center justify-center space-x-2"
                >
                  {loader ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Inquiry</span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Global CSS for PhoneInput fix */}
      <style>{`
        .phone-input-container .react-tel-input .form-control {
          height: auto !important;
          line-height: 1.5 !important;
          font-size: 1rem !important;
        }
        .phone-input-container .react-tel-input .selected-flag {
          background: transparent !important;
          padding-left: 12px;
        }
      `}</style>
    </section>
  );
};

export default Contact;
