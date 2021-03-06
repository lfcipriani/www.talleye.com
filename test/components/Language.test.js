import { render, screen } from '@testing-library/react';
import Language from '../../components/Language';

test('renders the flag and language name', () => {
  render(<Language lang="pt-BR" />);
  var element = screen.getByText(/Portuguese/);
  expect(element).toBeInTheDocument();
  element = screen.getByAltText(/pt-BR/);
  expect(element).toBeInTheDocument();
});
