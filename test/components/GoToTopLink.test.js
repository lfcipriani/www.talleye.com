import renderer from 'react-test-renderer';
import GoToTopLink from '../../components/GoToTopLink';

describe('GoToTopLink snapshot', () => {
  it('renders without size', () => {
    const component = renderer.create(<GoToTopLink />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(<GoToTopLink size="42" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
