import { getPostData } from '../../lib/posts';

describe('getPostData', () => {
  it('returns HTML version of markdown post', async () => {
    const result = await getPostData('markdown-test');
    expect(result.contentHtml).toMatch(/<h1>Hello!/);
  });
});
