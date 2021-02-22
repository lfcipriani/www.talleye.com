import Layout from '../components/layout';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getSortedContentData } from '../lib/content';

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <blockquote>
        <p className={styles.bioText}>
          I&apos;m Luis Cipriani and this is a collection of some interesting computer science
          projects I built and articles I wrote in the past.
        </p>
      </blockquote>
      <section className={styles.articleList}>
        {allPostsData.monthGroups.map((yearMonth) => (
          <div className={styles.monthGroup} key={yearMonth}>
            <h2 className={styles.month}>{yearMonth}</h2>
            <ul>
              {allPostsData[yearMonth].map(({ slug, title, description }) => (
                <li key={slug}>
                  <Link href={`/${allPostsData.type}/${slug}`}>
                    <a className={styles.articleTitle}>
                      <h3>{title}</h3>
                    </a>
                  </Link>
                  <p className={styles.articleDescription}>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedContentData('posts');
  return {
    props: {
      allPostsData,
    },
  };
}
