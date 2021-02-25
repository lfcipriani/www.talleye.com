import { render, screen } from '@testing-library/react';
import Date from '../../components/Date';

test('renders article date in the right format', () => {
  render(<Date dateString="2017-02-07T00:00:00.000Z" />);
  const date = screen.getByText('2017-02-07');
  expect(date).toBeInTheDocument();
});
