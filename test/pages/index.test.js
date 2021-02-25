import { render } from '@testing-library/react';
import Home from '../../pages/index';
import { getGroupedContentMetadata } from '../../lib/content';

test('render the index page with mini bio', async () => {
  const allPostsData = await getGroupedContentMetadata('posts');
  const { getByText } = render(<Home allPostsData={allPostsData} />);
  const element = getByText(/Luis Cipriani and this is a collection/);
  expect(element).toBeInTheDocument();
});

test('render the index page with content list', async () => {
  const allPostsData = await getGroupedContentMetadata('posts');
  const { getByText } = render(<Home allPostsData={allPostsData} />);
  expect(allPostsData.type).toEqual('posts');
  var element = getByText(/Markdown test post 2/);
  expect(element).toBeInTheDocument();
  element = getByText(/Another markdown post for you my friend/);
  expect(element).toBeInTheDocument();
});
