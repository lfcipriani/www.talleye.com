import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - {process.env.NEXT_PUBLIC_SITE_TITLE}</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="Luis Cipriani" />
        <meta name="og:title" content={`About - ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
        <meta property="og:image" content="" />
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>About me</h1>
        </header>
        <section className="marquidaoum">
          <div className="avatar">
            <Image src="/avatar.png" alt="My avatar" width="300" height="375" layout="intrinsic" />
          </div>
          <p>
            I'm a Brazilian living in Berlin for a while now and a happy parent and husband. Working
            in software development and engineering management for more more than 20 years. I'm
            passionate about building products that are loved by customers and creating high
            performance tech teams.
          </p>
          <p>
            Currently working as CTO at Beat81, a fittech startup in Berlin. Previously worked at
            Twitter, Rocket Internet, Abril Digital, and startups between early and series B stages
            as software engineer, developer advocate, product manager or engineering manager.
          </p>
          <p>
            Also worked in a diverse set of industries such as finance, news, social, vc incubators,
            logistics, fitness and sports companies and tackled different technical challenges with
            different level of scale and complexity.
          </p>
          <p>
            Beyond this website, you can find stuff more about me and my interests in the following
            places:
          </p>
          <ul>
            <li>
              <Link href="https://github.com/lfcipriani">
                <a target="_blank">Github</a>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/lfcipriani">
                <a target="_blank">Twitter</a>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/luiscipriani/">
                <a target="_blank">Linkedin</a>
              </Link>
            </li>
          </ul>
        </section>
        <style jsx>
          {`
            .avatar {
              float: right;
              margin: 10px 0 10px 20px;
            }
            @media screen and (max-width: 500px) {
              .avatar {
                float: none;
                margin: 10px 0;
                text-align: center;
              }
            }
          `}
        </style>
      </article>
    </Layout>
  );
}
