import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the event registration page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /university event registration/i })
  ).toBeInTheDocument();
});

test('allows selecting a different event during registration', () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /register/i })[1]);

  expect(
    screen.getByRole('heading', { name: /register for: cultural night/i })
  ).toBeInTheDocument();
});
