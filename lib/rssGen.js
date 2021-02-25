import RSS from 'rss';
import { getContentMetadata, getContentData } from './content';

export async function generateRSS(type) {
  var feed = new RSS({
    title: `${process.env.NEXT_PUBLIC_SITE_TITLE} - Tall Eye`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    feed_url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${type}-rss.xml`,
    site_url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    copyright: 'https://creativecommons.org/licenses/by-nc/4.0/',
    language: 'en',
    pubDate: '2007-01-01T00:00:00.000Z',
    ttl: 60,
  });

  const postsMetadata = getContentMetadata(type);
  for (const e of postsMetadata.slice(0, 20)) {
    const content = await getContentData(type, e.slug, true);
    feed.item({
      title: content.title,
      description: content.contentHtml,
      url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${type}/${content.slug}`,
      author: content.author,
      date: content.datePublished,
    });
  }

  return feed.xml({ indent: true });
}
