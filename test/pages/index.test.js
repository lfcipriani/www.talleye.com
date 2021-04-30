import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';
import { getGroupedContentMetadata } from '../../lib/content';

beforeAll(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    pathname: '/',
    locale: 'en',
    defaultLocale: 'en',
  }));
});

test('render the index page with mini bio', async () => {
  const allPostsData = await getGroupedContentMetadata('posts');
  render(<Home allPostsData={allPostsData} />);
  const element = screen.getByText(/All Posts/);
  expect(element).toBeInTheDocument();
});

test('render the index page with content list', async () => {
  const allPostsData = await getGroupedContentMetadata('posts');
  render(<Home allPostsData={allPostsData} />);
  expect(allPostsData.type).toEqual('posts');
  var element = screen.getByText(/Markdown test post 2/);
  expect(element).toBeInTheDocument();
  element = screen.getByText(/Another markdown post for you my friend/);
  expect(element).toBeInTheDocument();
});

test('render a language hint when the content is not in English', async () => {
  const allPostsData = await getGroupedContentMetadata('posts');
  render(<Home allPostsData={allPostsData} />);
  expect(allPostsData.type).toEqual('posts');
  var element = screen.getByText(/Olá Mundo!/);
  expect(element).toBeInTheDocument();
});
