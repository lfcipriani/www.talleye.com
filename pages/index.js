import fs from 'fs';
import Layout from '../components/Layout';
import Language from '../components/Language';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getGroupedContentMetadata } from '../lib/content';
import { generateRSS } from '../lib/rssGen';
import { generateSitemap } from '../lib/sitemap';
import i from '../content/i18n';

const type = 'posts';

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <blockquote>
        <p className={styles.bioText}>
          {i('bioShortText')
            ? i('bioShortText')(<Link href="https://www.beat81.com">BEAT81</Link>)
            : ''}
        </p>
      </blockquote>
      <section className={styles.articleList}>
        <h1>{i('allPosts')}</h1>
        {allPostsData.monthGroups.map((yearMonth) => (
          <div className={styles.monthGroup} key={yearMonth}>
            <h2 className={styles.month}>{yearMonth}</h2>
            <ul>
              {allPostsData[yearMonth].map(({ slug, title, description, lang, alternate }) => (
                <li key={slug}>
                  <Link
                    href={`/${allPostsData.type}/${slug}`}
                    locale={lang}
                    className={styles.articleTitle}
                  >
                    <h3>{title}</h3>
                  </Link>
                  <p className={styles.articleDescription}>
                    {description}
                    <br />
                    <Language lang={lang} alternate={alternate} type={type} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  if (process.env.NODE_ENV !== 'test' && locale === 'en') {
    const path = `${process.cwd()}/public/${type}-rss.xml`;
    const rssFeed = await generateRSS(type);
    fs.writeFileSync(path, rssFeed, 'utf8');
    console.log('Generated RSS feed.');

    await generateSitemap();
    console.log('Generated sitemap.xml.');
  }

  const allPostsData = getGroupedContentMetadata(type, locale);
  return {
    props: {
      allPostsData,
      locale,
    },
  };
}
