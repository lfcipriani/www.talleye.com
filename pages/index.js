import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <blockquote>
        <p className={styles.bioText}>
          I&apos;m Luis Cipriani and this is a collection of some interesting computer science
          projects I built and articles I wrote in the past.
        </p>
      </blockquote>
      <section className={styles.articleList}>
        <div className={styles.monthGroup}>
          <h2 className={styles.month}>2019-01</h2>
          <ul>
            <li>
              <a href="#" className={styles.articleTitle}>
                <h3>Title of the article</h3>
              </a>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
            <li>
              <a href="#" className={styles.articleTitle}>
                <h3>Title of the article, a long one just as an example</h3>
              </a>
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
              <a href="#" className={styles.articleTitle}>
                <h3>Title of the article</h3>
              </a>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
          </ul>
        </div>
        <div className={styles.monthGroup}>
          <h2 className={styles.month}>2018-11</h2>
          <ul>
            <li>
              <a href="#" className={styles.articleTitle}>
                <h3>
                  Title of the article, but the title is an article. Did you get it? hahahaha,
                  that's nice my friend.
                </h3>
              </a>
              <p className={styles.articleDescription}>Description of the article.</p>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
