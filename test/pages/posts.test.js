import { render, screen } from '@testing-library/react';
import Post from '../../pages/posts/[slug]';
import { getContentData } from '../../lib/content';

beforeAll(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    pathname: '/',
    locale: 'en',
    defaultLocale: 'en',
  }));
});

test('renders post metadata', async () => {
  const postData = await getContentData('posts', 'another-md');
  render(<Post postData={postData} />);
  var element = screen.getByText(/Another markdown/);
  expect(element).toBeInTheDocument();
  element = screen.getByText(/2021-01-01/);
  expect(element).toBeInTheDocument();
  element = screen.getByText(/1 min/);
  expect(element).toBeInTheDocument();
});

test('renders post content', async () => {
  const postData = await getContentData('posts', 'markdown-test');
  render(<Post postData={postData} />);
  var element = screen.getByText(/Unordered sub-list/);
  expect(element).toBeInTheDocument();
  element = screen.getByText(/4 min/);
  expect(element).toBeInTheDocument();
});

test('render a language hint when the content is not in English', async () => {
  const postData = await getContentData('posts', 'portuguese-post');
  render(<Post postData={postData} />);
  var element = screen.getByText(/Olá Mundo!/);
  expect(element).toBeInTheDocument();
});
