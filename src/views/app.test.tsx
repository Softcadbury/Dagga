import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders learn react link', () => {
  render(<App />);
  const element = screen.getByText(/Dagga/i);
  expect(element).toBeInTheDocument();
});
