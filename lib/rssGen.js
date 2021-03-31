import RSS from 'rss';
import { getContentMetadata, getContentData } from './content';
import i from '../content/i18n';

export async function generateRSS(type) {
  var feed = new RSS({
    title: `${i('siteTitle', 'en')} - Tall Eye`,
    description: i('siteDescription', 'en'),
    feed_url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${type}-rss.xml`,
    site_url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    copyright: 'https://creativecommons.org/licenses/by-nc/4.0/',
    language: 'en',
    pubDate: '2007-01-01T00:00:00.000Z',
    ttl: 60,
  });

  const postsMetadata = getContentMetadata(type, 'en');
  for (const e of postsMetadata.slice(0, 20)) {
    const content = await getContentData(type, e.slug, { absoluteImgSrc: true });
    feed.item({
      title: content.title,
      description: content.contentHtml,
      url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
        content.lang && content.lang !== 'en' ? '/' + content.lang : ''
      }/${type}/${content.slug}`,
      author: content.author,
      date: content.datePublished,
    });
  }

  return feed.xml({ indent: true });
}
