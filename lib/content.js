import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import rehypePrism from '@mapbox/rehype-prism';
import readingTime from 'reading-time';
import { parseISO, format } from 'date-fns';

const contentDirectory = path.join(process.cwd(), process.env.CONTENT_FOLDER);

export function getSortedContentData(type) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(path.join(contentDirectory, type));
  const allContentData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(contentDirectory, type, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const yearMonth = format(parseISO(matterResult.data.datePublished), 'yyyy-MM');
    matterResult.data.yearMonth = yearMonth;

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    };
  });
  // grouping content by yearMonth and ordering
  var sortedContentData = {
    monthGroups: [],
    type: type,
  };
  allContentData.forEach((content) => {
    if (content.slug === 'markdown-test') {
      return;
    }
    if (!sortedContentData.monthGroups.includes(content.yearMonth)) {
      sortedContentData.monthGroups.push(content.yearMonth);
      sortedContentData.monthGroups.sort();
      sortedContentData[content.yearMonth] = [];
    }
    sortedContentData[content.yearMonth].push(content);
    sortedContentData[content.yearMonth].sort((a, b) => {
      if (a.datePublished < b.datePublished) {
        return 1;
      } else {
        return -1;
      }
    });
  });
  sortedContentData.monthGroups.reverse();

  return sortedContentData;
}

export function getAllContentSlugs(type) {
  const fileNames = fs.readdirSync(path.join(contentDirectory, type));
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getContentData(type, slug) {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Calculating reading time
  const stats = readingTime(fileContents);
  matterResult.data.readingTime = Math.round(stats.minutes);

  // Converting markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(stringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
