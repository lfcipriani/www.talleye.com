import renderer from 'react-test-renderer';
import RSSLink from '../../components/RSSLink';

describe('RSSLink snapshot', () => {
  it('renders without size', () => {
    const component = renderer.create(<RSSLink />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(<RSSLink size="42" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
