import { render, screen } from '@testing-library/react';
import ReadingTime from '../../components/ReadingTime';

beforeEach(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    locale: 'en',
    defaultLocale: 'en',
  }));
});

test('renders reading time in the right format', () => {
  render(<ReadingTime minutes="123" />);
  const rt = screen.getByText('123 min');
  expect(rt).toBeInTheDocument();
});
