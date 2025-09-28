import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    author: z.string().or(z.object({
      name: z.string(),
      title: z.string().optional(),
      avatar: z.string().optional(),
      bio: z.string().optional(),
      social: z.record(z.string()).optional(),
    })).optional(),
    heroImage: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
      credit: z.string().optional(),
    }).optional(),
    category: z.enum(['Product Updates', 'Engineering', 'Case Studies', 'Industry News', 'Tutorials', 'Company News', 'Best Practices']),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    readTime: z.number().optional(),
    excerpt: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      noindex: z.boolean().optional(),
      canonical: z.string().optional(),
    }).optional(),
    relatedPosts: z.array(z.string()).optional(),
    series: z.object({
      name: z.string(),
      order: z.number(),
      total: z.number(),
    }).optional(),
    toc: z.boolean().optional().default(true),
    comments: z.boolean().optional().default(true),
    social: z.object({
      image: z.string().optional(),
      twitterCard: z.string().optional(),
      hashtags: z.array(z.string()).optional(),
    }).optional(),
  }),
});

const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['guide', 'tutorial', 'template', 'whitepaper', 'case-study', 'webinar', 'documentation', 'tool', 'checklist', 'ebook']),
    category: z.enum(['Getting Started', 'Best Practices', 'Integration', 'API & Development', 'Security & Compliance', 'Industry Solutions', 'Product Features']),
    pubDate: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
    duration: z.object({
      minutes: z.number(),
      format: z.string(),
    }).optional(),
    format: z.enum(['article', 'video', 'interactive', 'pdf', 'spreadsheet', 'presentation']).optional(),
    thumbnail: z.object({
      src: z.string(),
      alt: z.string(),
      type: z.enum(['icon', 'screenshot', 'illustration']).optional(),
    }).optional(),
    downloadUrl: z.string().optional(),
    gated: z.boolean().optional().default(false),
    formFields: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    learningObjectives: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    relatedResources: z.array(z.string()).optional(),
    author: z.object({
      name: z.string(),
      title: z.string().optional(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
    }).optional(),
    version: z.string().optional(),
    fileSize: z.string().optional(),
    tools: z.array(z.object({
      name: z.string(),
      version: z.string().optional(),
      downloadUrl: z.string().optional(),
      requirements: z.string().optional(),
    })).optional(),
    industry: z.array(z.enum(['Healthcare', 'Finance', 'Retail', 'Education', 'Technology', 'Manufacturing', 'Real Estate'])).optional(),
    certification: z.object({
      name: z.string(),
      provider: z.string(),
      validity: z.string(),
      badge: z.string().optional(),
    }).optional(),
    video: z.object({
      platform: z.enum(['youtube', 'vimeo', 'custom']),
      id: z.string(),
      duration: z.string().optional(),
      transcript: z.string().optional(),
      chapters: z.array(z.object({
        title: z.string(),
        time: z.string(),
      })).optional(),
    }).optional(),
    interactive: z.object({
      type: z.enum(['quiz', 'calculator', 'assessment']),
      embedUrl: z.string(),
      completionTime: z.string().optional(),
    }).optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      canonical: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'resources': resourcesCollection,
};