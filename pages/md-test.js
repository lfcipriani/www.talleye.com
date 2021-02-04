import Layout from '../components/layout';
import { getPostData } from '../lib/posts';

export default function MdTest({ postData }) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await getPostData('markdown-test');
  return {
    props: {
      postData,
    },
  };
}
