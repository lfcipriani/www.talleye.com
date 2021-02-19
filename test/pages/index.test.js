import { render } from '@testing-library/react';
import Home from '../../pages/index';

test('renders deploy link', () => {
  const { getByText } = render(<Home />);
  const element = getByText(/Luis Cipriani and this is a collection/);
  expect(element).toBeInTheDocument();
});
