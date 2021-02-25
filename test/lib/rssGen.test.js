import { generateRSS } from '../../lib/rssGen';

describe('generateRSS', () => {
  it('renders RSS feed for a specific content type', async () => {
    const feed = await generateRSS('posts');
    expect(feed).toMatch(/<rss/);
    expect(feed).toMatch(/Markdown test post 2/);
    expect(feed).toMatch(/<p>Lorem ipsum dolor/);
    expect(feed).toMatch(/<item>/);
  });
});
