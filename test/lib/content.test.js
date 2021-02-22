import { getAllContentSlugs, getContentData, getSortedContentData } from '../../lib/content';

describe('getSortedContentData', () => {
  it('return sorted list of slugs and metadata, ordered by most recent', () => {
    const result = getSortedContentData('posts');
    expect(result.monthGroups).toHaveLength(2);
    expect(result['2020-11'][0].slug).toEqual('yet-another');

    expect(result['2021-01'][1].slug).toEqual('another-md');
    expect(result['2021-01'][0].slug).toEqual('md-test-2');
    expect(result['2021-01'][0].title).toEqual('Markdown test post 2');
    expect(result['2021-01'][0].tags).toEqual('markdown, test');
  });
});

describe('getAllContentSlugs', () => {
  it('return all posts slugs under posts content folder', () => {
    const slugs = getAllContentSlugs('posts');
    expect(slugs).toHaveLength(4);
    expect(slugs[0].params.slug).toEqual('another-md');
    expect(slugs[1].params.slug).toEqual('markdown-test');
  });
});

describe('getContentData', () => {
  it('returns HTML version of markdown post', async () => {
    const result = await getContentData('posts', 'markdown-test');
    expect(result.contentHtml).toMatch(/<h1>Hello!/);
  });

  it('returns slug and content metadata', async () => {
    const result = await getContentData('posts', 'markdown-test');
    expect(result.slug).toEqual('markdown-test');
    expect(result.title).toEqual('Markdown test post');
    expect(result.tags).toEqual('markdown, test');
  });
});
