import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Date from '../../components/Date';

test('renders article date in the right format', () => {
  render(<Date dateString="2017-02-07T00:00:00.000Z" />);
  const date = screen.getByText('2017-02-07');
  expect(date).toBeInTheDocument();
});

describe('Date snapshot', () => {
  it('renders with date', () => {
    const component = renderer.create(<Date dateString="2017-02-07T00:00:00.000Z" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
