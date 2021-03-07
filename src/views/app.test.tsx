import { render, screen } from '@testing-library/react';
import App from './app';

test('renders form', () => {
  render(<App />);
  const element = screen.getByText(/Période/i);
  expect(element).toBeInTheDocument();
});
