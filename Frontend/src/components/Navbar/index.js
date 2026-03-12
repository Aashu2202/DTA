/*
  Responsive sticky navbar with scroll‑to‑section links,
  dark mode toggle and mobile drawer.
*/
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import useDarkMode from '../../hooks/useDarkMode';

const NAV_ITEMS = [
  { label: 'Home', to: 'hero' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why' },
  { label: 'Stats', to: 'stats' },
  { label: 'AI', to: 'ai' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'FAQ', to: 'faq' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, toggleDark] = useDarkMode();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-md dark:bg-gray-900' : 'bg-white shadow-sm dark:bg-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-bold text-primary">
            D-Table Analytics
          </a>
        </div>
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="relative cursor-pointer text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
              activeClass="text-primary"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all hover:w-full"></span>
            </ScrollLink>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
          <a
            href="#contact"
            className="inline-block px-4 py-2 bg-primary text-white rounded-2xl shadow hover:bg-indigo-600 transition-colors"
          >
            Get Started
          </a>
          <div className="md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              className="p-2 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900/90 backdrop-blur p-4">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth={true}
              duration={500}
              className="block py-2 text-gray-700 dark:text-gray-200"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </ScrollLink>
          ))}
        </div>
      )}
    </nav>
  );
}
