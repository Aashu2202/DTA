/*
  Contact section includes company info and a contact form.
  Form submission uses EmailJS; tailwind for styling.
*/
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLocation } from 'react-icons/io5';
import { IoIosCall } from 'react-icons/io';

const Contact = () => {
  const showToastMessage = (type) => {
    const position = 'top-right';
    switch (type) {
      case 'success':
        toast.success('Mail sent successfully', { position });
        break;
      case 'error':
        toast.error('Error sending mail. Please try again.', { position });
        break;
      case 'warning':
        toast.warning('Please fill valid email address', { position });
        break;
      default:
        toast.info('Please fill all the required fields', { position });
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: '',
    phone: '',
  });

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      showToastMessage('warning');
      setLoader(false);
      return;
    }

    const templateParams = {
      to_name: 'D-table-analytics',
      from_name: formData.name,
      message: formData.message,
      reason: formData.reason,
      user_email: formData.email,
      phone: formData.phone,
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (response) => {
        showToastMessage('success');
        setLoader(false);
      },
      (error) => {
        showToastMessage('error');
        setLoader(false);
      }
    );
  };

  return (
    <section id="contact" className="py-20 bg-background-light dark:bg-gray-800">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Reach out with questions, project inquiries or to start a trial.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <IoLocation className="w-6 h-6 text-primary mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                Indore | Bhopal | Delhi
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <IoIosCall className="w-6 h-6 text-primary mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                +91 87702 40025
              </span>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300">Email:</p>
              <a
                href="mailto:contact@dtable-analytics.com"
                className="text-primary underline"
              >
                contact@dtable-analytics.com
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none" 
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none"
            />
          </div>
          <PhoneInput
            country={'in'}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="w-full rounded-lg"
          />
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loader}
            className="px-6 py-3 bg-primary text-white rounded-2xl hover:bg-indigo-600 transition"
          >
            {loader ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
