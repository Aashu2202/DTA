import '@testing-library/jest-dom';

// Polyfill for IntersectionObserver which is missing in jsdom
// Required for Framer Motion's whileInView to work in tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};
