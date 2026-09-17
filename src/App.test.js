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

test('normalizes phone numbers and alerts for invalid details', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /event registration/i })[0]);

  fireEvent.change(screen.getByLabelText(/phone/i), {
    target: { value: '+91 98765-43210' },
  });
  expect(screen.getByLabelText(/phone/i)).toHaveValue('9876543210');

  fireEvent.change(screen.getByLabelText(/student name/i), {
    target: { value: 'Test Student' },
  });
  fireEvent.change(screen.getByLabelText(/enrollment id/i), {
    target: { value: 'bad id!' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'invalid-email' },
  });
  fireEvent.submit(screen.getByRole('button', { name: /submit registration/i }).closest('form'));

  expect(alertSpy).toHaveBeenCalledWith('Please enter a valid email address.');
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  alertSpy.mockRestore();
});

test('changes phone format when a different country is selected', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /event registration/i })[0]);

  fireEvent.change(screen.getByLabelText(/country/i), {
    target: { value: 'AU' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '+61 412-345-678' },
  });

  expect(screen.getByLabelText(/phone number/i)).toHaveValue('412345678');
  expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('maxLength', '9');
});

test('accepts the required ADTU enrollment ID format', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /event registration/i })[0]);

  fireEvent.change(screen.getByLabelText(/student name/i), {
    target: { value: 'Test Student' },
  });
  fireEvent.change(screen.getByLabelText(/enrollment id/i), {
    target: { value: 'adtu/1/2024-27/bcao/119' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'student@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '9876543210' },
  });
  fireEvent.submit(screen.getByRole('button', { name: /submit registration/i }).closest('form'));

  expect(alertSpy).not.toHaveBeenCalled();
  expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  expect(screen.getByText('ADTU/1/2024-27/BCAO/119')).toBeInTheDocument();
  alertSpy.mockRestore();
});

test('rejects enrollment IDs with missing required slashes', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  fireEvent.click(screen.getAllByRole('button', { name: /event registration/i })[0]);

  fireEvent.change(screen.getByLabelText(/enrollment id/i), {
    target: { value: 'ADTU-1-2024-27-BCAO-119' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '9876543210' },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'student@example.com' },
  });
  fireEvent.submit(screen.getByRole('button', { name: /submit registration/i }).closest('form'));

  expect(alertSpy).toHaveBeenCalledWith(
    'Enrollment ID must match ADTU/1/2024-27/BCAO/119.'
  );
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  alertSpy.mockRestore();
});
