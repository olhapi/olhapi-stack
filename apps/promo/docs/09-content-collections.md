# Content Collections Specification

## Overview
Content collections in Astro provide a type-safe way to manage and query content. This document defines the schema and structure for the Blog and Resources collections, which power the content-driven sections of the website.

## Blog Collection

### Purpose
Manage blog posts, articles, and news updates with consistent metadata and organization.

### File Structure
```
src/content/blog/
├── en/
│   ├── introducing-new-features.md
│   ├── industry-insights-2024.mdx
│   └── customer-success-story.md
├── de/
│   ├── neue-funktionen.md
│   └── branchen-einblicke-2024.mdx
└── [other-locales]/
```

### Schema Definition

#### Required Fields

**title** (string)
- Post title displayed in listings and page
- Maximum 100 characters
- Used for SEO title tag
- Should be engaging and descriptive

**description** (string)
- Brief summary of the post
- Maximum 160 characters
- Used for meta description and post excerpts
- Should include key points and keywords

**pubDate** (datetime)
- Original publication date
- Format: YYYY-MM-DD or full ISO 8601
- Used for sorting and display
- Affects SEO freshness signals

**author** (object or string)
- Author information
- Can be string (name) or object with details:
  - name (required)
  - title
  - avatar
  - bio
  - social links

**category** (string)
- Primary category for organization
- Options:
  - Product Updates
  - Engineering
  - Case Studies
  - Industry News
  - Tutorials
  - Company News
  - Best Practices

#### Optional Fields

**updateDate** (datetime)
- Last significant update
- Shows "Updated on" notice
- Important for SEO

**heroImage** (object)
- Featured image for post
- Properties:
  - src (image path or URL)
  - alt (alt text)
  - caption (optional)
  - credit (optional)

**tags** (array of strings)
- Secondary categorization
- Used for related posts
- Searchable metadata
- 3-5 tags recommended

**featured** (boolean)
- Highlight in featured section
- Pin to top of listings
- Show special badge

**draft** (boolean)
- Hide from production builds
- Useful for work in progress
- Still accessible in development

**readTime** (number or auto)
- Estimated reading time in minutes
- Can be manually set or auto-calculated
- Based on ~200 words per minute

**excerpt** (string)
- Custom excerpt if different from description
- Supports markdown
- Maximum 300 characters

**seo** (object)
- Override default SEO values:
  - title
  - description
  - image
  - noindex
  - canonical

**relatedPosts** (array)
- Manually specified related posts
- Array of slugs
- Overrides automatic suggestions

**cta** (object)
- Post-specific call-to-action:
  - text
  - url
  - type (demo, trial, download)

**video** (object)
- Embedded video content:
  - platform (youtube, vimeo, custom)
  - id or url
  - thumbnail
  - duration

**series** (object)
- Part of article series:
  - name
  - order
  - total

**toc** (boolean)
- Show table of contents
- Auto-generated from headings
- Default: true for long posts

**comments** (boolean)
- Enable/disable comments
- Default: true

**social** (object)
- Social media specific:
  - image (Open Graph)
  - twitterCard
  - hashtags

### Content Guidelines

#### Markdown Features
- Headers (H2-H6, H1 reserved for title)
- Bold and italic text
- Lists (ordered and unordered)
- Block quotes
- Code blocks with syntax highlighting
- Tables
- Links (internal and external)
- Images with captions
- Horizontal rules

#### MDX Components
- Interactive demos
- Custom CTAs
- Video players
- Code sandboxes
- Charts and graphs
- Accordion/tabs
- Alert boxes
- Tweet embeds

#### Front Matter Example
```yaml
title: "Revolutionizing SaaS: Our 2024 Product Roadmap"
description: "Discover the exciting features and improvements coming to our platform in 2024."
pubDate: 2024-01-15
updateDate: 2024-02-01
author:
  name: "Jane Smith"
  title: "Head of Product"
  avatar: "/images/authors/jane-smith.jpg"
category: "Product Updates"
tags: ["roadmap", "features", "2024", "product-strategy"]
featured: true
heroImage:
  src: "./images/2024-roadmap-hero.jpg"
  alt: "2024 Product Roadmap Visualization"
readTime: 8
draft: false
```

## Resources Collection

### Purpose
Manage guides, documentation, templates, webinars, and other educational content.

### File Structure
```
src/content/resources/
├── en/
│   ├── guides/
│   │   ├── getting-started.md
│   │   └── advanced-configuration.mdx
│   ├── templates/
│   │   ├── project-template.md
│   │   └── report-template.md
│   ├── webinars/
│   │   └── mastering-automation.md
│   └── whitepapers/
│       └── industry-report-2024.md
├── de/
│   └── [same structure]
└── [other-locales]/
```

### Schema Definition

#### Required Fields

**title** (string)
- Resource title
- Clear and descriptive
- Maximum 100 characters

**description** (string)
- Brief summary
- Maximum 200 characters
- Highlights value proposition

**type** (enum)
- Resource type classification:
  - guide
  - tutorial
  - template
  - whitepaper
  - case-study
  - webinar
  - documentation
  - tool
  - checklist
  - ebook

**category** (string)
- Primary categorization:
  - Getting Started
  - Best Practices
  - Integration
  - API & Development
  - Security & Compliance
  - Industry Solutions
  - Product Features

**pubDate** (datetime)
- Publication/creation date
- Used for sorting

#### Optional Fields

**difficulty** (enum)
- Content difficulty level:
  - beginner
  - intermediate
  - advanced
  - expert

**duration** (object)
- Time investment required:
  - minutes (for reading/completion)
  - format (text: "15 min read", "2 hour course")

**format** (enum)
- Content format:
  - article
  - video
  - interactive
  - pdf
  - spreadsheet
  - presentation

**thumbnail** (object)
- Visual representation:
  - src
  - alt
  - type (icon, screenshot, illustration)

**downloadUrl** (string)
- Direct download link for files
- Can be gated
- Track downloads

**gated** (boolean)
- Requires form submission
- Default: false
- Lead generation

**formFields** (array)
- If gated, specify required fields:
  - email (always required)
  - name
  - company
  - role
  - phone

**prerequisites** (array)
- Required knowledge/resources:
  - List of prerequisite resources
  - Skills needed
  - Tools required

**learningObjectives** (array)
- What users will learn:
  - Bullet points
  - Skill outcomes
  - Practical applications

**tags** (array)
- Searchable metadata
- Feature areas
- Technologies
- Industries

**relatedResources** (array)
- Suggested follow-up content
- Resource slugs
- Manual curation

**author** (object)
- Creator information:
  - name
  - title
  - bio
  - avatar

**lastUpdated** (datetime)
- Content refresh date
- Shows currency
- Important for docs

**version** (string)
- Version number for docs
- Product version compatibility
- API version

**fileSize** (string)
- For downloadable content
- Human-readable format
- "2.5 MB", "450 KB"

**tools** (array)
- Required tools/software:
  - Names and versions
  - Links to downloads
  - System requirements

**industry** (array)
- Industry relevance:
  - Healthcare
  - Finance
  - Retail
  - Education
  - Technology

**certification** (object)
- If completion grants certification:
  - name
  - provider
  - validity
  - badge

**video** (object)
- For video content:
  - platform
  - id/url
  - duration
  - transcript
  - chapters

**interactive** (object)
- For interactive content:
  - type (quiz, calculator, assessment)
  - embedUrl
  - completionTime

**seo** (object)
- SEO overrides:
  - title
  - description
  - keywords
  - canonical

### Content Guidelines

#### Resource Quality Standards
- Clear learning objectives
- Structured progression
- Practical examples
- Visual aids
- Downloadable materials
- Regular updates

#### Metadata Accuracy
- Accurate difficulty ratings
- Realistic time estimates
- Current version information
- Proper categorization
- Comprehensive tagging

### Front Matter Example
```yaml
title: "Complete Guide to API Integration"
description: "Learn how to integrate our API into your application with step-by-step instructions."
type: "guide"
category: "API & Development"
difficulty: "intermediate"
duration:
  minutes: 30
  format: "30 min read"
format: "article"
pubDate: 2024-01-20
lastUpdated: 2024-02-15
author:
  name: "John Developer"
  title: "Senior API Engineer"
thumbnail:
  src: "./images/api-guide-thumb.png"
  alt: "API Integration Guide"
tags: ["api", "integration", "development", "rest", "webhooks"]
prerequisites:
  - "Basic programming knowledge"
  - "API key from dashboard"
learningObjectives:
  - "Understand authentication methods"
  - "Make your first API call"
  - "Handle responses and errors"
  - "Implement webhooks"
gated: false
version: "2.0"
```

## Content Management Workflows

### Publishing Process

#### Draft Stage
1. Create content file with `draft: true`
2. Review in development environment
3. Internal review and feedback
4. SEO optimization check
5. Accessibility review

#### Publication
1. Remove draft flag or set to false
2. Set pubDate to publication date
3. Verify all metadata
4. Check related content links
5. Deploy to production

#### Updates
1. Modify content as needed
2. Update `updateDate` field
3. Note changes in content
4. Maintain URL (no slug changes)
5. Redirect if URL must change

### Localization Workflow

#### Primary Language (English)
1. Create content in `/en/` folder
2. Complete all metadata
3. Publish when ready

#### Translations
1. Copy file structure to locale folder
2. Translate content and metadata
3. Maintain same slug for URL consistency
4. Localize images if needed
5. Adapt examples to local context

### Content Relationships

#### Automatic Relationships
- Same category posts
- Matching tags (2+ matches)
- Same author content
- Series navigation
- Recent in category

#### Manual Curation
- Featured posts selection
- Related content overrides
- Series ordering
- Collection highlights

## API Usage

### Querying Collections

#### Get All Posts
- Retrieve all blog posts
- Filter by locale
- Sort by date
- Exclude drafts in production

#### Category Filtering
- Filter by single category
- Multiple category support
- Subcategory hierarchies

#### Tag Filtering
- Single or multiple tags
- Tag combination logic
- Tag frequency counts

#### Search Implementation
- Full-text search
- Metadata search
- Fuzzy matching
- Search suggestions

#### Pagination
- Page size configuration
- Offset/cursor pagination
- Total count
- Page navigation

### Content Rendering

#### Markdown Processing
- Syntax highlighting
- Custom components
- Image optimization
- Link processing

#### MDX Components
- Component imports
- Props passing
- Conditional rendering
- Interactive elements

#### SEO Generation
- Meta tags
- Open Graph
- Twitter Cards
- JSON-LD structured data

#### RSS Feeds
- Full content vs excerpts
- Category-specific feeds
- Multi-language feeds
- Enclosures for media

## Performance Optimization

### Build Time
- Incremental builds
- Content caching
- Image processing
- Static generation

### Runtime
- Lazy loading
- Code splitting
- CDN delivery
- Edge caching

### Search
- Search index generation
- Client-side search
- Server-side search
- Hybrid approach

## Analytics Integration

### Content Metrics
- Page views
- Read time
- Scroll depth
- Engagement rate
- Social shares

### User Behavior
- Content paths
- Exit points
- Return visits
- Download tracking
- Video engagement

### Performance Metrics
- Load times
- Core Web Vitals
- Error rates
- Search performance

## Maintenance

### Content Audits
- Outdated content review
- Broken link checks
- SEO health
- Performance review
- Accessibility compliance

### Version Control
- Git history
- Content versioning
- Rollback capability
- Change tracking
- Collaboration tools

### Backup Strategy
- Regular backups
- Content export
- Media backup
- Database backup
- Recovery procedures