import renderer from 'react-test-renderer';
import SiteHeader from '../../components/SiteHeader';

beforeEach(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    locale: 'en',
    defaultLocale: 'en',
  }));
});

describe('SiteHeader snapshot', () => {
  it('renders Header', () => {
    const component = renderer.create(<SiteHeader />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
