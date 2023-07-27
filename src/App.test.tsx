import { render, screen } from '@testing-library/react';

import App from './App';

test('renders password form', () => {
  // Arrange
  render(<App />);

  // Act
  const linkElement = screen.getByText(/reset password/i);

  // Assert
  expect(linkElement).toBeInTheDocument();
});
