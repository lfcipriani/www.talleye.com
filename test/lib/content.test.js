import {
  getContentMetadata,
  getAllContentSlugs,
  getContentData,
  getGroupedContentMetadata,
} from '../../lib/content';

describe('getContentMetadata', () => {
  it('return sorted list of slugs and metadata, ordered by most recent', () => {
    const result = getContentMetadata('posts');
    expect(result).toHaveLength(5);
    expect(result[2].slug).toEqual('yet-another');
    expect(result[1].slug).toEqual('another-md');
    expect(result[0].slug).toEqual('md-test-2');
  });
});

describe('getGroupedContentMetadata', () => {
  it('return sorted list of slugs and metadata, grouped by year and month', () => {
    const result = getGroupedContentMetadata('posts');
    expect(result.monthGroups).toHaveLength(4);
    expect(result.monthGroups[0]).toEqual('2021-01');
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
    expect(slugs).toHaveLength(9);
    expect(slugs[0].params.slug).toEqual('another-md');
    expect(slugs[2].params.slug).toEqual('markdown-test');
  });

  it('return also the locale for non English posts', () => {
    const slugs = getAllContentSlugs('posts');
    expect(slugs).toHaveLength(9);
    expect(slugs[5].params.slug).toEqual('portuguese-post');
    expect(slugs[5].locale).toEqual('pt-BR');
  });

  it('return slugs for all locales in case it is required via function parameters', () => {
    const slugs = getAllContentSlugs('posts', ['en', 'pt-BR']);
    expect(slugs).toHaveLength(18);
    expect(slugs[0].params.slug).toEqual('another-md');
    expect(slugs[0].locale).toEqual('en');
    expect(slugs[1].params.slug).toEqual('another-md');
    expect(slugs[1].locale).toEqual('pt-BR');
  });
});

describe('getContentData', () => {
  it('returns HTML version of markdown post', async () => {
    const result = await getContentData('posts', 'md-test-2');
    expect(result.contentHtml).toMatch(/<h1>Hello!/);
    expect(result.contentHtml).toMatch(/src="\/icon48.png/);
  });

  it('returns slug and content metadata', async () => {
    const result = await getContentData('posts', 'markdown-test');
    expect(result.slug).toEqual('markdown-test');
    expect(result.title).toEqual('Markdown test post');
    expect(result.tags).toEqual('markdown, test');
  });

  it('returns content in a different language', async () => {
    const result = await getContentData('posts', 'portuguese-post');
    expect(result.slug).toEqual('portuguese-post');
    expect(result.title).toEqual('Olá Mundo!');
    expect(result.lang).toEqual('pt-BR');
  });

  it('converts img urls to absolute path in case it is a RSS feed', async () => {
    const result = await getContentData('posts', 'md-test-2', { absoluteImgSrc: true });
    expect(result.contentHtml).toMatch(/src="https:\/\/.+\/icon48.png/);
    expect(result.contentHtml).not.toMatch(/src="https:\/\/.+http.+\/icon48.png/);
  });

  it('adds target="_blank" automatically for external links', async () => {
    const result = await getContentData('posts', 'markdown-test');
    expect(result.contentHtml).toMatch(/<a href="\/posts\/yet-another">Yet Another/);
    expect(result.contentHtml).toMatch(
      /<a href="https:\/\/www\.google\.com" target="_blank">I'm an inline/
    );
  });

  it('returns content in the root of content folder', async () => {
    const result = await getContentData('', 'root');
    expect(result.contentHtml).toMatch(/<p>This is a markdown root content/);
  });
});
