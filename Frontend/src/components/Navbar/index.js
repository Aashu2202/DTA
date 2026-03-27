/*
  Responsive sticky navbar with scroll-to-section links,
  dark mode toggle and mobile drawer.
  Breakpoint: lg (1024 px) — desktop links visible; below that, hamburger menu.
  With 9 nav items + CTA + theme toggle, md (768 px) is too narrow.
*/
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import useDarkMode from '../../hooks/useDarkMode';
import logoIcon from '../../assets/D-Table_Logo.png';
import logoText from '../../assets/D-Table_Title_Text.png';

const NAV_ITEMS = [
  { label: 'Home', to: 'hero', isScroll: true },
  { label: 'About Us', to: 'about', isScroll: true },
  { label: 'Why Us', to: 'why-us', isScroll: true },
  { label: 'Services', to: '/services', isScroll: false },
  { label: 'Stats', to: 'stats', isScroll: true },
  { label: 'Testimonials', to: 'testimonials', isScroll: true },
  { label: 'FAQ', to: 'faq', isScroll: true },
  { label: 'Careers', to: '/careers', isScroll: false },
  { label: 'Contact Us', to: 'contact', isScroll: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, toggleDark] = useDarkMode();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const desktopNavClass = ({ isActive }) =>
    isActive
      ? 'relative cursor-pointer text-primary font-semibold text-sm transition-colors border-b-2 border-primary pb-0.5'
      : 'relative cursor-pointer text-gray-700 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium';

  const renderDesktopLink = (item) => {
    const base = 'relative cursor-pointer text-gray-700 dark:text-gray-200 hover:text-primary transition-colors text-sm font-medium';
    const underline = <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all hover:w-full" />;

    if (item.isScroll) {
      if (isHome) {
        return (
          <ScrollLink key={item.to} to={item.to} smooth duration={500} className={base} activeClass="text-primary font-semibold">
            {item.label}{underline}
          </ScrollLink>
        );
      }
      return (
        <RouterLink key={item.to} to={`/#${item.to}`} className={base}>
          {item.label}{underline}
        </RouterLink>
      );
    }
    return (
      <NavLink key={item.to} to={item.to} className={desktopNavClass}>
        {({ isActive }) => (
          <>
            {item.label}
            {!isActive && <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all hover:w-full" />}
          </>
        )}
      </NavLink>
    );
  };

  const mobileNavClass = ({ isActive }) =>
    isActive
      ? 'block py-3 px-2 text-base text-primary font-semibold bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-primary rounded-lg transition-colors'
      : 'block py-3 px-2 text-base text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors';

  const renderMobileLink = (item) => {
    const base = 'block py-3 px-2 text-base text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors';

    if (item.isScroll) {
      if (isHome) {
        return (
          <ScrollLink key={item.to} to={item.to} smooth duration={500} className={base} onClick={closeMenu}>
            {item.label}
          </ScrollLink>
        );
      }
      return (
        <RouterLink key={item.to} to={`/#${item.to}`} className={base} onClick={closeMenu}>
          {item.label}
        </RouterLink>
      );
    }
    return (
      <NavLink key={item.to} to={item.to} className={mobileNavClass} onClick={closeMenu}>
        {item.label}
      </NavLink>
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-md dark:bg-gray-900' : 'bg-white shadow-sm dark:bg-gray-900'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <div className="flex-shrink-0">
          <NavLink
            to="/"
            end
            className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
          >
            {/* Logo Icon — always visible */}
            <img
              src={logoIcon}
              alt="D-Table Logo Icon"
              className="h-12 w-auto object-contain"
            />
            {/* Logo Text — hidden on mobile, visible on sm+ */}
            <img
              src={logoText}
              alt="D-Table Analytics"
              className="block h-10 sm:h-20 sm:pt-2 w-auto max-w-[120px] sm:max-w-none object-contain dark:brightness-0 dark:invert"
            />
          </NavLink>
        </div>

        {/* Desktop nav links — visible only at lg+ */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_ITEMS.map(renderDesktopLink)}
        </div>

        {/* Right controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark mode toggle — always visible */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
          </button>

          {/* CTA — only on desktop (lg+) */}
          <a
            href="#contact"
            className="hidden lg:inline-block px-4 py-2 bg-primary text-white text-sm rounded-2xl shadow hover:bg-indigo-600 transition-colors"
          >
            Get Started
          </a>

          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6 text-gray-700 dark:text-gray-200" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer + backdrop */}
      {open && (
        <>
          {/* Backdrop — click to close */}
          <div
            className="lg:hidden fixed inset-0 top-16 bg-black/30 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="lg:hidden relative z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pt-3 pb-6 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="space-y-1">
              {NAV_ITEMS.map(renderMobileLink)}
            </nav>

            {/* CTA inside drawer */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block w-full text-center px-6 py-3 bg-primary text-white font-semibold rounded-2xl shadow hover:bg-indigo-600 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
