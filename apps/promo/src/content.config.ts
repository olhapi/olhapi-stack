import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory including subdirectories
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: z
                .object({
                    alt: z.string(), caption: z.string().optional(), credit: z.string().optional(), src: image().optional(),
                })
                .optional(),
            category: z.string().optional(),
            tags: z.array(z.string()).optional(),
            featured: z.boolean().optional(),
            readTime: z.number().optional(),
            draft: z.boolean().optional(),
            // Language is inferred from the folder structure (en/*, de/*)
        }),
});

export const collections = { blog };
