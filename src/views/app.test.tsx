import { render, screen } from '@testing-library/react';
import App from './app';

test('renders form', () => {
    render(<App />);

    const element1 = screen.getByText(/Durée/i);
    expect(element1).toBeInTheDocument();

    const element2 = screen.getByText(/Investissements/i);
    expect(element2).toBeInTheDocument();
});
