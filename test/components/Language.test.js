import { render, screen } from '@testing-library/react';
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
    var alternate = [{ lang: 'pt-BR', slug: 'slug' }];
    render(<Language lang="en" alternate={alternate} type="posts" />);
    element = screen.getByText(/Also available/);
    expect(element).toBeInTheDocument();
    var element = screen.getByText(/Português/);
    expect(element).toBeInTheDocument();
  });

  it('renders links to 2 alternate contents', () => {
    var alternate = [
      { lang: 'pt-BR', slug: 'slug' },
      { lang: 'de', slug: 'slug' },
    ];
    render(<Language lang="en" alternate={alternate} type="posts" />);
    var element = screen.getByText(/Also available/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/Português/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/German/);
    expect(element).toBeInTheDocument();
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
    render(<Language lang="en" />);
    var element = screen.getByText(/Somente disponível/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/English/);
    expect(element).toBeInTheDocument();
  });

  it('render warning and links to 1 alternate content', () => {
    var alternate = [{ lang: 'pt-BR', slug: 'slug' }];
    render(<Language lang="en" alternate={alternate} type="posts" />);
    var element = screen.getByText(/Somente disponível/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/English/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/Português/);
    expect(element).toBeInTheDocument();
  });

  it('render warning and links to 2 alternate contents', () => {
    var alternate = [
      { lang: 'pt-BR', slug: 'slug' },
      { lang: 'de', slug: 'slug' },
    ];
    render(<Language lang="en" alternate={alternate} type="posts" />);
    var element = screen.getByText(/Somente disponível/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/English/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/Português/);
    expect(element).toBeInTheDocument();
    element = screen.getByText(/German/);
    expect(element).toBeInTheDocument();
  });

  it('render with a wrapper', () => {
    render(
      <Language lang="en" wrapper={(children) => <p data-testid="wrappertest">{children}</p>} />
    );
    var element = screen.getByTestId(/wrappertest/);
    expect(element).toBeInTheDocument();
  });
});
