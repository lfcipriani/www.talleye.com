import path from 'path';
import { configureSitemap } from '@sergeymyssak/nextjs-sitemap';
import { getContentMetadata } from './content';

export function generateSitemap() {
  const slugs = getContentMetadata('posts', 'en').map(
    (e) => `${e.lang && e.lang !== 'en' ? '/' + e.lang : ''}/posts/${e.slug}`
  );

  const Sitemap = configureSitemap({
    baseUrl: 'https://www.talleye.com',
    include: slugs,
    excludeIndex: true,
    exclude: ['/404', '/posts/[slug]'],
    pagesConfig: {
      '/': {
        priority: '1',
        changefreq: 'weekly',
      },
      '/posts/*': {
        priority: '0.8',
        changefreq: 'weekly',
      },
    },
    isTrailingSlashRequired: false,
    targetDirectory: path.join(process.cwd(), '/public'),
    pagesDirectory: path.join(process.cwd(), '/pages'),
  });
  Sitemap.generateSitemap();
}
