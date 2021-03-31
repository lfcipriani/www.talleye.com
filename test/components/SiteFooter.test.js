import renderer from 'react-test-renderer';
import SiteFooter from '../../components/SiteFooter';

beforeEach(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    locale: 'en',
    defaultLocale: 'en',
  }));
});

describe('SiteFooter snapshot', () => {
  it('renders Footer', () => {
    const component = renderer.create(<SiteFooter />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
