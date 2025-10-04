import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog');

    // Filter English posts
    const englishPosts = posts
        .filter((post) => post.id.startsWith('en/'))
        .filter((post) => !post.data.draft)
        .toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro v4.0</generator>
    `, description: SITE_DESCRIPTION, items: englishPosts.map((post) => {
            const slug = post.id.replace('en/', '');
            return {
                author:
                    typeof post.data.author === 'string'
                        ? post.data.author
                        : post.data.author?.name || 'Your SaaS Platform', categories: post.data.tags || [], content: post.data.excerpt || post.data.description, customData: `
          <category>${post.data.category}</category>
          ${post.data.heroImage ? `<enclosure url="${post.data.heroImage.src}" type="image/jpeg" />` : ''}
          ${post.data.readTime ? `<readTime>${post.data.readTime}</readTime>` : ''}
        `, description: post.data.description, link: `/blog/${slug}/`, pubDate: post.data.pubDate, title: post.data.title,
            };
        }), site: context.site?.toString() || 'https://example.com', title: SITE_TITLE,
    });
}
