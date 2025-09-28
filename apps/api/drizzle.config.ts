import { defineConfig } from 'drizzle-kit';
import { config } from './config/app.ts';

export default defineConfig({
    schema: './lib/auth/auth-schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.DATABASE_URL,
    },
});
