# DTA

This frontend has been refactored into a modern SaaS-style React application with Tailwind CSS and Framer Motion animations.

## Features

- Responsive sticky navbar with smooth scroll links
- Dark/light theme toggle with persistence
- Animated hero section with gradient and blobs
- Interactive services cards, stats counters, testimonials, FAQ accordion
- AI Assistant promo, contact form, and chat widget
- Tailwind CSS for clean utility-first styling
- Framer Motion for micro-interactions and scroll animations
- Modular component structure for maintainability

## Getting Started

1. Install dependencies:
   ```bash
   cd Frontend
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm install react-scroll
   ```
2. Ensure `.env` contains EmailJS keys if using contact form.
3. Run development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Notes

Style files from the old bootstrap-based design remain in the project but
are no longer referenced. New components are located under `src/components/`.
The design emphasizes whitespace, bold typography, and premium gradients.

For any additional sections or components, follow the existing file structure
and reuse utility classes. Animations should remain subtle and professional.