/*
  Footer with multi-column layout, quick links, and social icons.
  Dark background with hover effects to match premium aesthetic.
*/
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-4">D-Table Analytics</h4>
          <p className="text-sm">
            Empowering businesses with AI-driven data intelligence and workflow
            automation.
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Services</h5>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-white">Data Management</a></li>
            <li><a href="#services" className="hover:text-white">Business Intelligence</a></li>
            <li><a href="#services" className="hover:text-white">WhatsApp Automation</a></li>
            <li><a href="#services" className="hover:text-white">24/7 Support</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2">
            <li><a href="#why" className="hover:text-white">Why Us</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Contact</h5>
          <p className="text-sm">Email: contact@dtable-analytics.com</p>
          <p className="text-sm">Phone: +1-800-DTABLE-1</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://twitter.com" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://facebook.com" className="hover:text-white"><FaFacebook /></a>
            <a href="https://github.com" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        © {new Date().getFullYear()} D-Table Analytics. All rights reserved.
      </div>
    </footer>
  );
}
