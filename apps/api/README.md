# API Server

Fastify-based API server with TypeScript, authentication, file uploads, and billing integration.

## 🛠️ Tech Stack

- **Framework**: Fastify with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **File Storage**: S3-compatible storage
- **Email**: SendGrid
- **Billing**: Autumn.js
- **Caching**: Redis
- **Error Tracking**: Sentry (optional)

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database
- Redis (optional, for caching)
- S3-compatible storage bucket
- SendGrid account for emails

### Environment Setup

1. Copy the environment file:

    ```bash
    cp .env.example .env
    ```

2. Configure the required environment variables (see Environment Variables section below)

3. Run database migrations:
    ```bash
    pnpm dlx drizzle-kit generate
    pnpm dlx drizzle-kit migrate
    ```

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with hot reload
pnpm start            # Start production server

# Testing
pnpm test             # Run test suite with coverage

# Code Quality
pnpm lint             # Lint code with oxlint
pnpm check-types      # Run TypeScript type checking

# S3 Setup
pnpm setup:s3         # Configure S3 CORS settings
pnpm verify:s3        # Verify S3 configuration
```

## 🗄️ Database

The API uses PostgreSQL with Drizzle ORM for type-safe database operations.

### Schema Management

```bash
# Generate migration files
pnpm dlx drizzle-kit generate

# Apply migrations
pnpm dlx drizzle-kit migrate

# View database in Drizzle Studio
pnpm dlx drizzle-kit studio
```

## 🔐 Authentication

Authentication is handled by Better Auth using **magic link authentication only**:

- Magic link authentication (passwordless)
- Session management
- Rate limiting
- CSRF protection
- Automatic account creation on first login

### Endpoints

- `POST /api/auth/send-magic-link` - Send magic link to email
- `GET /api/auth/callback/magic-link` - Verify magic link and create session
- `POST /api/auth/sign-out` - Logout and destroy session
- `GET /api/auth/session` - Get current session

## 📧 Email System

The API integrates with SendGrid for transactional emails:

- Magic link authentication emails
- Contact form notifications
- System notifications

## 📤 File Upload System

The API provides secure file upload endpoints with S3 storage:

### Upload Endpoints

- `POST /api/upload/avatar` - Avatar images (2MB max, jpeg/png/webp)
- `POST /api/upload/images` - General images (5MB max, multiple files)
- `POST /api/upload/files` - General files (10MB max, multiple files)
- `POST /api/upload/documents` - Documents (25MB max, pdf/doc/docx)

### Features

- File type validation
- Size limits per endpoint
- Virus scanning (configurable)
- Direct browser uploads with presigned URLs
- Automatic file optimization

## 💳 Billing Integration

Billing is powered by Autumn.js & Stripe:

- Subscription management
- Usage-based billing
- Payment processing
- Customer portal
- Webhook handling

## ⚙️ Environment Variables

Required environment variables:

### Core Configuration

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Authentication

```env
AUTH_SECRET=your-super-secure-secret-key-here-at-least-32-chars
AUTH_URL=http://localhost:3001
```

### Email (SendGrid)

```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Your App Name
```

### S3 Storage

```env
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_PRIVATE_BUCKET_NAME=your-private-bucket
S3_PUBLIC_BUCKET_NAME=your-public-bucket
S3_PUBLIC_URL=https://your-bucket.s3.amazonaws.com
```

### Billing (Autumn.js)

```env
AUTUMN_SECRET_KEY=your-autumn-secret-key
```

### Optional

```env
REDIS_URL=redis://localhost:6379
SENTRY_DSN=https://your-sentry-dsn
RATE_LIMIT_MAX=100
```

## 🌐 API Routes

### Health Check

- `GET /` - API health status

### Authentication

- `POST /api/auth/*` - Better Auth routes

### File Uploads

- `POST /api/upload/*` - File upload endpoints

### Billing

- `POST /api/billing/webhook` - Autumn webhook handler
- `GET /api/billing/portal` - Customer portal access

## 🔧 Configuration

### CORS

The API supports multiple client origins via the `CLIENT_ORIGIN` environment variable:

```env
CLIENT_ORIGIN=http://localhost:3000,http://localhost:4321
```

### Rate Limiting

Configurable rate limiting per endpoint:

```env
RATE_LIMIT_MAX=100  # requests per minute
```

### Upload Limits

```env
UPLOAD_SIZE_LIMIT=10485760  # 10MB default
UPLOAD_AUTH_REQUIRED=true   # require authentication
```

## S3 Object Storage Setup

This project uses S3 Object Storage for file uploads, including avatar uploads. To enable browser-based uploads, you need to configure CORS properly.

### Prerequisites

1. S3 Object Storage bucket (e.g., `user-assets`)
2. S3 API keys with the following permissions:
    - `ObjectStorageObjectsRead`
    - `ObjectStorageObjectsWrite`
    - `ObjectStorageBucketsRead`
    - `ObjectStorageBucketsWrite` (required for CORS configuration)

### Environment Configuration

Ensure your `.env` file contains:

```env
# S3 Upload Configuration
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=fr-par
S3_PRIVATE_BUCKET_NAME=your-private-bucket-name
S3_PUBLIC_BUCKET_NAME=your-public-bucket-name
S3_PUBLIC_URL=https://your-public-bucket-name.s3.fr-par.scw.cloud
S3_ENDPOINT=https://s3.fr-par.scw.cloud
```

### CORS Setup

#### Automated Setup (Recommended)

Use the provided scripts to manage CORS configuration:

```bash
# Apply CORS configuration for development
node --env-file=.env scripts/setup-s3-cors.ts
```

### Troubleshooting

#### CORS Error: "No 'Access-Control-Allow-Origin' header"

This error occurs when:

- CORS is not configured on the bucket
- Frontend origin is not in the allowed origins list
- S3 credentials lack bucket management permissions

**Solutions:**

1. Ensure S3 credentials have bucket management permissions
2. Configure CORS manually in your S3 provider's console if automated setup fails

#### Access Denied Error

If you get "AccessDenied" when running setup scripts:

- Verify S3 credentials have the correct permissions
- Check bucket ownership in your S3 provider's console
- Use manual CORS configuration as fallback
