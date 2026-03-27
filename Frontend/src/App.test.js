import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FAQ section', () => {
  render(<App />);
  const faqElement = screen.getByText(/FAQ/i);
  expect(faqElement).toBeInTheDocument();
});
