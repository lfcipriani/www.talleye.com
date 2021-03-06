import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import raw from 'rehype-raw';
import rehypePrism from '@mapbox/rehype-prism';
import inspectUrls from '@jsdevtools/rehype-url-inspector';
import readingTime from 'reading-time';
import { parseISO, format } from 'date-fns';

const contentDirectory = path.join(process.cwd(), process.env.CONTENT_FOLDER);

export function getContentMetadata(type) {
  const fileNames = fs.readdirSync(path.join(contentDirectory, type));
  const allContentData = fileNames.map((fileName) => {
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
  const testIndex = allContentData.findIndex((e) => {
    return e.slug === 'markdown-test';
  });
  allContentData.splice(testIndex, 1);

  return allContentData.sort((a, b) => {
    if (a.datePublished < b.datePublished) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getGroupedContentMetadata(type) {
  const allContentData = getContentMetadata(type);
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
      sortedContentData[content.yearMonth] = [];
    }
    sortedContentData[content.yearMonth].push(content);
  });

  return sortedContentData;
}

export function getAllContentSlugs(type) {
  const fileNames = fs.readdirSync(path.join(contentDirectory, type));

  return fileNames.map((fileName) => {
    const fullPath = path.join(contentDirectory, type, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    var result = {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
    if (matterResult.data.lang !== undefined) {
      result.locale = matterResult.data.lang;
    }
    return result;
  });
}

export async function getContentData(type, slug, absoluteImgSrc = false) {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Calculating reading time
  const stats = readingTime(fileContents);
  matterResult.data.readingTime = Math.round(stats.minutes) === 0 ? 1 : Math.round(stats.minutes);

  // Converting markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(inspectUrls, {
      inspectEach(url) {
        if (!absoluteImgSrc) {
          return false;
        }
        if (!url.node.properties.src.startsWith('http')) {
          url.node.properties.src =
            'https://' + process.env.NEXT_PUBLIC_SITE_DOMAIN + url.node.properties.src;
        }
      },
      selectors: ['img[src]'],
    })
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
