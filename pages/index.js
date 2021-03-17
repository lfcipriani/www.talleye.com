import fs from 'fs';
import Layout from '../components/Layout';
import Language from '../components/Language';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getGroupedContentMetadata } from '../lib/content';
import { generateRSS } from '../lib/rssGen';
import { generateSitemap } from '../lib/sitemap';

const type = 'posts';

export default function Home({ allPostsData, locale }) {
  return (
    <Layout>
      <blockquote>
        <p className={styles.bioText}>
          I'm{' '}
          <Link href="https://twitter.com/lfcipriani">
            <a>Luis Cipriani</a>
          </Link>
          , software engineer and engineering manager. This website is a collection of some projects
          I built or articles I wrote about technology and software dev. I hope they are useful for
          you as much as I had fun making them. I also work as CTO at{' '}
          <Link href="https://www.beat81.com">
            <a>Beat81</a>
          </Link>
          .
        </p>
      </blockquote>
      <section className={styles.articleList}>
        <h1>All posts</h1>
        {allPostsData.monthGroups.map((yearMonth) => (
          <div className={styles.monthGroup} key={yearMonth}>
            <h2 className={styles.month}>{yearMonth}</h2>
            <ul>
              {allPostsData[yearMonth].map(({ slug, title, description, lang, alternate }) => (
                <li key={slug}>
                  <Link href={`/${allPostsData.type}/${slug}`} locale={lang !== locale && lang}>
                    <a className={styles.articleTitle}>
                      <h3>{title}</h3>
                    </a>
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
  if (process.env.NODE_ENV !== 'test') {
    const path = `${process.cwd()}/public/${type}-rss.xml`;
    const rssFeed = await generateRSS(type);
    fs.writeFileSync(path, rssFeed, 'utf8');
    console.log('Generated RSS feed.');

    generateSitemap();
    console.log('Generated sitemap.xml.');
  }

  const allPostsData = getGroupedContentMetadata(type);
  return {
    props: {
      allPostsData,
      locale,
    },
  };
}
