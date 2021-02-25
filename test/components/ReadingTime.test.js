import { render, screen } from '@testing-library/react';
import ReadingTime from '../../components/ReadingTime';

test('renders reading time in the right format', () => {
  render(<ReadingTime minutes="123" />);
  const rt = screen.getByText('123 min');
  expect(rt).toBeInTheDocument();
});
