import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import rehypePrism from '@mapbox/rehype-prism';
import inspectUrls from '@jsdevtools/rehype-url-inspector';
import readingTime from 'reading-time';
import { parseISO, format } from 'date-fns';

const contentDirectory = path.join(process.cwd(), process.env.CONTENT_FOLDER);

function parseFrontmatter(fileContents) {
  const matterResult = matter(fileContents);

  matterResult.data.lang = matterResult.data.lang || 'en';
  const yearMonth = format(parseISO(matterResult.data.datePublished), 'yyyy-MM');
  matterResult.data.yearMonth = yearMonth;
  const stats = readingTime(fileContents);
  matterResult.data.readingTime = Math.round(stats.minutes) === 0 ? 1 : Math.round(stats.minutes);

  return matterResult;
}

function readContentDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];
  files.forEach((file) => {
    const slug = file.name.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(dir, file.name);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = parseFrontmatter(fileContents);

    // Combine the data with the slug
    result.push({
      slug,
      ...matterResult.data,
    });
  });
  return result;
}

export function getContentMetadata(type, locale = 'en') {
  const allContentData = readContentDir(path.join(contentDirectory, type));

  const alternateSlugs = [];
  const filteredContent = allContentData.filter((content) => {
    if (content.slug === 'markdown-test') {
      return false;
    }
    if (content.lang !== locale) {
      if (content.alternate) {
        if (content.alternate.find((alt) => alt.lang === locale) !== undefined) {
          return false;
        } else {
          if (
            alternateSlugs.some(
              (s) => content.alternate.find((alt) => alt.slug === s) !== undefined
            )
          ) {
            return false;
          } else {
            alternateSlugs.push(content.slug);
          }
        }
      }
    }
    return true;
  });

  return filteredContent.sort((a, b) => {
    if (a.datePublished < b.datePublished) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getGroupedContentMetadata(type, locale = 'en') {
  const allContentData = getContentMetadata(type, locale);
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

export function getAllContentSlugs(type, forLocales = null) {
  const allContentData = readContentDir(path.join(contentDirectory, type));

  return allContentData
    .map((content) => {
      var result = [];
      if (forLocales) {
        forLocales.forEach((l) => {
          result.push({
            params: {
              slug: content.slug,
            },
            locale: l,
          });
        });
      } else {
        result.push({
          params: {
            slug: content.slug,
          },
          locale: content.lang,
        });
      }
      return result;
    })
    .flat();
}

export async function getContentData(type, slug, options = { absoluteImgSrc: false }) {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = parseFrontmatter(fileContents);

  // Converting markdown to HTML
  const processedContent = await remark()
    // parsing Github flavored markdown
    .use(remarkGfm)
    // converting to rehype AST
    .use(remarkRehype, { allowDangerousHtml: true })
    // allowing html inside markdown
    .use(rehypeRaw)
    // url rewrites
    .use(inspectUrls, {
      inspectEach(url) {
        if (url.node.tagName === 'img') {
          // if RSS feed generation, write absolute img URLs
          if (!options.absoluteImgSrc) {
            return false;
          }
          if (!url.node.properties.src.startsWith('http')) {
            url.node.properties.src =
              'https://' + process.env.NEXT_PUBLIC_SITE_DOMAIN + url.node.properties.src;
          }
        } else if (url.node.tagName === 'a') {
          // if external link, add target blank
          if (url.node.properties.href.startsWith('http')) {
            url.node.properties.target = '_blank';
          } else if (options.absoluteImgSrc) {
            // if RSS feed generation, write absolute img URLs
            url.node.properties.href =
              'https://' + process.env.NEXT_PUBLIC_SITE_DOMAIN + url.node.properties.href;
          }
        }
      },
      selectors: ['img[src]', 'a[href]'],
    })
    // code syntax highlight
    .use(rehypePrism)
    // convert to string
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
