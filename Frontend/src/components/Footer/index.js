/*
  Footer with multi-column layout, quick links, and social icons.
  Dark background with hover effects to match premium aesthetic.
*/
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaCheckCircle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 relative">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
        <div>
          <h4 className="text-white font-semibold mb-6 tracking-wide text-lg">D-Table Analytics</h4>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering businesses with AI-driven data intelligence and workflow
            automation.
          </p>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            📍 1st Floor, Kolar Castle, 101,<br />
            Chuna Bhatti Square,<br />
            Bhopal, Madhya Pradesh 462039
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Privacy & Trust</h5>
          <ul className="space-y-1">
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Your data is safe</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">We respect your privacy</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Your inquiries are handled confidentially</span>
            </li>
            <li className="group flex items-start space-x-3 p-2 -ml-2 rounded-lg transition-colors hover:bg-gray-800/40">
              <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Secure and professional communication</span>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h5>
          <ul className="space-y-4 text-sm mt-2">
            <li>
              <a href="#why" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Why Us</a>
            </li>
            <li>
              <a href="#faq" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">FAQ</a>
            </li>
            <li>
              <a href="#contact" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Contact</a>
            </li>
            <li>
              <a href="#" className="inline-block transform transition-transform duration-300 hover:translate-x-1.5 text-gray-400 hover:text-white">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-6 tracking-wide">Contact</h5>
          <div className="space-y-3 text-sm text-gray-400 mt-2">
            <p className="flex items-center space-x-2">
              <span className="text-gray-500 min-w-[3rem]">Email:</span>
              <a href="mailto:hr@dtableanalytics.com" className="hover:text-white transition-colors">hr@dtableanalytics.com</a>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-gray-500 min-w-[3rem]">Phone:</span>
              <span className="text-gray-300">+91 87702 40025</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-blue-500/20 group">
              <FaTwitter className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/d-table-analytics-b523001a0/" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-blue-500/20 group">
              <FaLinkedin className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://www.instagram.com/dtanalytics/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-blue-500/20 group">
              <FaInstagram className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our GitHub page" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 text-gray-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-sm hover:shadow-blue-500/20 group">
              <FaGithub className="text-lg group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="pt-8 border-t border-gray-800/60 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} D-Table Analytics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
