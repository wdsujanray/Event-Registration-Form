import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the event registration page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /university event registration/i })
  ).toBeInTheDocument();
});
