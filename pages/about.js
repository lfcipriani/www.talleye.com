import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';
import { getContentData } from '../lib/content';
import { useRouter } from 'next/router';
import i from '../content/i18n';

export default function About({ postData }) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} - ${i('siteTitle')}`}</title>
        <meta name="og:title" content={`${postData.title} - ${i('siteTitle')}`} key="title" />
        <meta name="description" content={postData.description} key="desc" />
        <meta name="og:description" content={postData.description} key="og-desc" />
        <meta name="author" content={postData.author} key="author" />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
            router.locale !== router.defaultLocale ? '/' + router.locale : ''
          }${postData.image}`}
          key="image"
        />
        <meta name="keywords" content={postData.tags} key="keywords" />
        {postData.alternate &&
          postData.alternate.map((alt) => (
            <link
              key={alt.slug}
              rel="alternate"
              href={`https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${
                alt.lang !== router.defaultLocale ? '/' + alt.lang : ''
              }/${alt.slug}`}
              hrefLang={alt.lang}
            />
          ))}
      </Head>
      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{postData.title}</h1>
        </header>
        <section
          className="marquidaoum"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ locale, defaultLocale }) {
  const postData = await getContentData(
    '',
    'about' + (locale !== defaultLocale ? `-${locale}` : '')
  );
  return {
    props: {
      postData,
    },
  };
}
