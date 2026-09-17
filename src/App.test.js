import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the event registration page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /university event registration/i })
  ).toBeInTheDocument();
});

test('allows choosing a different event during registration', () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /register/i })[0]);
  expect(screen.getByRole('heading', { name: /register for: tech fest 2026/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /choose a different event/i }));

  expect(screen.getByRole('heading', { name: /university event registration/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /register/i })).toHaveLength(3);
});
