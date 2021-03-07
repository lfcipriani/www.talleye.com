//import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ThemeToggle from '../../components/ThemeToggle';

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
