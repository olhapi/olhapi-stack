import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        author: z
            .string()
            .or(
                z.object({
                    avatar: z.string().optional(), bio: z.string().optional(), name: z.string(), social: z.record(z.string()).optional(), title: z.string().optional(),
                }),
            )
            .optional(), category: z.enum([
            'Product Updates',
            'Engineering',
            'Case Studies',
            'Industry News',
            'Tutorials',
            'Company News',
            'Best Practices',
        ]), comments: z.boolean().optional().default(true), description: z.string(), draft: z.boolean().optional(), excerpt: z.string().optional(), featured: z.boolean().optional(), heroImage: z
            .object({
                alt: z.string(), caption: z.string().optional(), credit: z.string().optional(), src: z.string(),
            })
            .optional(), pubDate: z.coerce.date(), readTime: z.number().optional(), relatedPosts: z.array(z.string()).optional(), seo: z
            .object({
                canonical: z.string().optional(), description: z.string().optional(), image: z.string().optional(), noindex: z.boolean().optional(), title: z.string().optional(),
            })
            .optional(), series: z
            .object({
                name: z.string(),
                order: z.number(),
                total: z.number(),
            })
            .optional(), social: z
            .object({
                hashtags: z.array(z.string()).optional(), image: z.string().optional(), twitterCard: z.string().optional(),
            })
            .optional(), tags: z.array(z.string()).optional(), title: z.string(), toc: z.boolean().optional().default(true), updateDate: z.coerce.date().optional(),
    }), type: 'content',
});

const resourcesCollection = defineCollection({
    schema: z.object({
        author: z
            .object({
                avatar: z.string().optional(), bio: z.string().optional(), name: z.string(), title: z.string().optional(),
            })
            .optional(), category: z.enum([
            'Getting Started',
            'Best Practices',
            'Integration',
            'API & Development',
            'Security & Compliance',
            'Industry Solutions',
            'Product Features',
        ]), certification: z
            .object({
                badge: z.string().optional(), name: z.string(), provider: z.string(), validity: z.string(),
            })
            .optional(), description: z.string(), difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(), downloadUrl: z.string().optional(), duration: z
            .object({
                format: z.string(), minutes: z.number(),
            })
            .optional(), fileSize: z.string().optional(), formFields: z.array(z.string()).optional(), format: z.enum(['article', 'video', 'interactive', 'pdf', 'spreadsheet', 'presentation']).optional(), gated: z.boolean().optional().default(false), industry: z
            .array(
                z.enum(['Healthcare', 'Finance', 'Retail', 'Education', 'Technology', 'Manufacturing', 'Real Estate']),
            )
            .optional(), interactive: z
            .object({
                completionTime: z.string().optional(), embedUrl: z.string(), type: z.enum(['quiz', 'calculator', 'assessment']),
            })
            .optional(), lastUpdated: z.coerce.date().optional(), learningObjectives: z.array(z.string()).optional(), prerequisites: z.array(z.string()).optional(), pubDate: z.coerce.date(), relatedResources: z.array(z.string()).optional(), seo: z
            .object({
                canonical: z.string().optional(), description: z.string().optional(), keywords: z.array(z.string()).optional(), title: z.string().optional(),
            })
            .optional(), tags: z.array(z.string()).optional(), thumbnail: z
            .object({
                alt: z.string(), src: z.string(), type: z.enum(['icon', 'screenshot', 'illustration']).optional(),
            })
            .optional(), title: z.string(), tools: z
            .array(
                z.object({
                    downloadUrl: z.string().optional(), name: z.string(), requirements: z.string().optional(), version: z.string().optional(),
                }),
            )
            .optional(), type: z.enum([
            'guide',
            'tutorial',
            'template',
            'whitepaper',
            'case-study',
            'webinar',
            'documentation',
            'tool',
            'checklist',
            'ebook',
        ]), version: z.string().optional(), video: z
            .object({
                chapters: z
                    .array(
                        z.object({
                            time: z.string(), title: z.string(),
                        }),
                    )
                    .optional(), duration: z.string().optional(), id: z.string(), platform: z.enum(['youtube', 'vimeo', 'custom']), transcript: z.string().optional(),
            })
            .optional(),
    }), type: 'content',
});

export const collections = {
    blog: blogCollection,
    resources: resourcesCollection,
};
