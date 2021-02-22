import { render } from '@testing-library/react';
import Post from '../../pages/posts/[slug]';
import { getContentData } from '../../lib/content';

test('renders post metadata', async () => {
  const postData = await getContentData('posts', 'another-md');
  const { getByText } = render(<Post postData={postData} />);
  var element = getByText(/Another markdown/);
  expect(element).toBeInTheDocument();
  element = getByText(/2021-01-01/);
  expect(element).toBeInTheDocument();
  element = getByText(/0 min/);
  expect(element).toBeInTheDocument();
});

test('renders post content', async () => {
  const postData = await getContentData('posts', 'another-md');
  const { getByText } = render(<Post postData={postData} />);
  const element = getByText(/id est laborum/);
  expect(element).toBeInTheDocument();
});