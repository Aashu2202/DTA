import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  // Apply manual scroll restoration globally once to prevent native jump conflicts
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Capture the scroll target synchronously during the render phase
  // before child ServicesPage layout effects can clear it
  const hasScrollTarget = sessionStorage.getItem('scrollTargetServiceId');

  useEffect(() => {
    // Guard: skip scroll-to-top if we're on /services and have a saved target ID
    if (pathname === '/services' && hasScrollTarget) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hasScrollTarget]);

  return null;
}

export default ScrollToTop;
