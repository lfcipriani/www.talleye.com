import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ThemeToggle from '../../components/ThemeToggle';
import ThemeProvider from '../../components/Theme';

beforeAll(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    locale: 'en',
    defaultLocale: 'en',
  }));
});

test('renders the element', () => {
  const component = renderer.create(<ThemeToggle />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders the icon in the specified size', () => {
  const component = renderer.create(<ThemeToggle size="42" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
  });

  it('renders light theme by default', () => {
    const icon = screen.getByText(/Toggle to dark theme/);
    expect(icon).toBeInTheDocument();
  });

  it('switches icon when link is clicked', () => {
    var icon = screen.getByText(/Toggle to dark theme/);
    fireEvent.click(icon);

    icon = screen.getByText(/Toggle to light theme/);
    expect(icon).toBeInTheDocument();
  });
});
