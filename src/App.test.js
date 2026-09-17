import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the event registration page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /university event registration/i })
  ).toBeInTheDocument();
});

test('opens the registration form when an event is selected', async () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /event registration/i })[0]);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /register for: tech fest 2026/i })).toBeInTheDocument();
});
