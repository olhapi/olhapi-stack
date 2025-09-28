import { z } from 'zod';

const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => 3001),

    // Database
    DATABASE_URL: z.url(),

    // Redis (optional)
    REDIS_URL: z.url().optional(),

    // CORS - supports single URL or comma-separated list
    CLIENT_ORIGIN: z
        .string()
        .default('http://localhost:3000,http://localhost:4321')
        .transform((val) => {
            // Split by comma and validate each URL
            const origins = val.split(',').map((url) => url.trim());
            return origins.map((origin) => {
                const parsed = z.url().safeParse(origin);
                if (!parsed.success) {
                    throw new Error(`Invalid CLIENT_ORIGIN URL: ${origin}`);
                }
                return parsed.data;
            });
        }),

    // Authentication
    AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
    AUTH_URL: z.url().default('http://localhost:3001'),

    // Sentry (optional)
    SENTRY_DSN: z.url().optional(),

    // Rate limiting
    RATE_LIMIT_MAX: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => 100),

    // File uploads
    UPLOAD_SIZE_LIMIT: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => 10485760), // 10MB
    UPLOAD_AUTH_REQUIRED: z
        .string()
        .transform((val) => val === 'true')
        .default(() => true), // Secure by default

    // Email (SendGrid)
    SENDGRID_API_KEY: z.string().min(1, 'SENDGRID_API_KEY is required for email sending'),
    SENDGRID_FROM_EMAIL: z.email('SENDGRID_FROM_EMAIL must be a valid email'),
    SENDGRID_FROM_NAME: z.string().optional(),

    // Autumn (Billing)
    AUTUMN_SECRET_KEY: z.string().min(1, 'AUTUMN_SECRET_KEY is required for billing integration'),

    // S3 Storage
    S3_REGION: z.string().default('us-east-1'),
    S3_ACCESS_KEY_ID: z.string().min(1, 'S3_ACCESS_KEY_ID is required for S3 storage'),
    S3_SECRET_ACCESS_KEY: z.string().min(1, 'S3_SECRET_ACCESS_KEY is required for S3 storage'),
    S3_ENDPOINT: z.url().optional(),
    S3_PRIVATE_BUCKET_NAME: z.string().min(1, 'S3_PRIVATE_BUCKET_NAME is required'),
    S3_PUBLIC_BUCKET_NAME: z.string().min(1, 'S3_PUBLIC_BUCKET_NAME is required'),
    S3_PUBLIC_URL: z.url('S3_PUBLIC_URL must be a valid URL'),
});

function validateConfig() {
    try {
        const parsed = configSchema.parse(process.env);
        return parsed;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.issues
                .map((err: z.core.$ZodIssue) => `${err.path.join('.')}: ${err.message}`)
                .join('\n');

            console.error('❌ Configuration validation failed:');
            console.error(errorMessages);
            console.error('\nPlease check your environment variables and try again.');
            process.exit(1);
        }
        throw error;
    }
}

export const config = validateConfig();

export type Config = typeof config;
