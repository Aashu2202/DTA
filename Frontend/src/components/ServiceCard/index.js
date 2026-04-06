import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceCard({ service }) {
  const IconComponent = service.icon;

  return (
    <Link 
      to={`/services/${service.id}`} 
      className="block w-64 sm:w-72 flex-shrink-0 mx-2 sm:mx-3 outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50 rounded-2xl"
    >
      <motion.div
        whileHover={{ 
          y: -4, 
          boxShadow: "0 12px 20px -10px rgba(0,0,0,0.08)"
        }}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-soft-dark overflow-hidden border border-gray-100 dark:border-gray-700 group"
      >
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start gap-2 mb-3">
            <div className="p-2 bg-indigo-50 dark:bg-gray-700 rounded-xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-200">
              {IconComponent && <IconComponent className="w-5 h-5" />}
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200 mt-0.5">
              {service.title}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-snug">
            {service.shortDesc}
          </p>
          <div className="mt-5 flex items-center text-primary font-bold text-sm transition-all duration-300">
            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all group-hover:after:w-full">
              Learn more
            </span>
            <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
