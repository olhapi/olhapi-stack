import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  // Filter English posts
  const englishPosts = posts
    .filter(post => post.id.startsWith('en/'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site?.toString() || 'https://example.com',
    items: englishPosts.map((post) => {
      const slug = post.id.replace('en/', '');
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${slug}/`,
        author: typeof post.data.author === 'string'
          ? post.data.author
          : post.data.author?.name || 'Your SaaS Platform',
        categories: post.data.tags || [],
        content: post.data.excerpt || post.data.description,
        customData: `
          <category>${post.data.category}</category>
          ${post.data.heroImage ? `<enclosure url="${post.data.heroImage.src}" type="image/jpeg" />` : ''}
          ${post.data.readTime ? `<readTime>${post.data.readTime}</readTime>` : ''}
        `,
      };
    }),
    customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro v4.0</generator>
    `,
  });
}