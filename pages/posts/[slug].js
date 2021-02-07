import Layout from '../../components/layout';
import { getAllContentSlugs, getContentData } from '../../lib/content';

export default function Post({ postData }) {
  return (
    <Layout>
      <div className="marquidaoum" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllContentSlugs('posts');
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getContentData('posts', params.slug);
  return {
    props: {
      postData,
    },
  };
}
