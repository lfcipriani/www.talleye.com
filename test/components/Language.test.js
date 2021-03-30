import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Language from '../../components/Language';

describe('locale and content language are equal', () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      locale: 'en',
      defaultLocale: 'en',
    }));
  });

  it('renders empty without alternate links', () => {
    var { container } = render(<Language lang="en" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders links to alternate content', () => {
    const alternate = [{ lang: 'pt-BR', slug: 'slug' }];
    const component = renderer.create(<Language lang="en" alternate={alternate} type="posts" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders links to 2 alternate contents', () => {
    const alternate = [
      { lang: 'pt-BR', slug: 'slug' },
      { lang: 'de', slug: 'slug' },
    ];
    const component = renderer.create(<Language lang="en" alternate={alternate} type="posts" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('locale and content language are not equal', () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      locale: 'pt-BR',
      defaultLocale: 'en',
    }));
  });

  it('render warning without alternate content', () => {
    const component = renderer.create(<Language lang="en" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render warning and links to 1 alternate content', () => {
    const alternate = [{ lang: 'pt-BR', slug: 'slug' }];
    const component = renderer.create(<Language lang="en" alternate={alternate} type="posts" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render warning and links to 2 alternate contents', () => {
    const alternate = [
      { lang: 'pt-BR', slug: 'slug' },
      { lang: 'de', slug: 'slug' },
    ];
    const component = renderer.create(<Language lang="en" alternate={alternate} type="posts" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render with a wrapper', () => {
    const component = renderer.create(
      <Language lang="en" wrapper={(children) => <p data-testid="wrappertest">{children}</p>} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
