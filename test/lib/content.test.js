import { getAllContentSlugs, getPostData } from '../../lib/content';

describe('getPostData', () => {
  it('returns HTML version of markdown post', async () => {
    const result = await getPostData('markdown-test');
    expect(result.contentHtml).toMatch(/<h1>Hello!/);
  });
});

describe('getAllContentSlugs', () => {
  it('return all posts slugs under posts content folder', () => {
    const slugs = getAllContentSlugs('posts');
    expect(slugs).toHaveLength(2);
    expect(slugs[0].params.slug).toEqual('another-md');
    expect(slugs[1].params.slug).toEqual('markdown-test');
  });
});
