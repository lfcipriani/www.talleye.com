import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <section className="callout">
        <p className={styles.bioText}>
          I&apos;m Luis Cipriani and this is a collection of some interesting computer science
          projects I built and articles I wrote in the past.
        </p>
        <p className={styles.bioText}>I'm married with Ieda, father of Bento.</p>
      </section>
      <section className={styles.articleList}>
        <div className={styles.monthGroup}>
          <h2 className={styles.month}>2019-01</h2>
          <ul>
            <li>
              <h3 className={styles.articleTitle}>Title of the article</h3>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
            <li>
              <h3 className={styles.articleTitle}>
                Title of the article 2, that's very long my friend, maybe even longer than you.
              </h3>
              <p className={styles.articleDescription}>
                Description of the article 2. <a href="#">Description of the article 2</a>,
                Description of the article 2, Description of the article 2, Description of the
                article 2, Description of the article 2
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.monthGroup}>
          <h2 className={styles.month}>2018-12</h2>
          <ul>
            <li>
              <h3 className={styles.articleTitle}>Title of the article</h3>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
          </ul>
        </div>
        <div className={styles.monthGroup}>
          <h2 className={styles.month}>2018-11</h2>
          <ul>
            <li>
              <h3 className={styles.articleTitle}>Title of the article</h3>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
