import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { autumn } from 'autumn-js/better-auth';
import { db } from '../../db/db.ts';
import { config } from '../../config/app.ts';
import { sendMagicLinkEmail } from '../../services/email.ts';
import * as authSchema from './auth-schema.ts';

export const auth = betterAuth({
    baseURL: config.AUTH_URL, database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            ...authSchema,
        },
    }), plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                try {
                    await sendMagicLinkEmail(email, url);
                } catch (error) {
                    // Log error without sensitive information
                    console.error('Failed to send magic link email:', error);
                    console.error(`Magic link delivery failed for email: ${email}`);
                    throw error;
                }
            },
        }),
        autumn(),
    ], secret: config.AUTH_SECRET, session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    }, trustedOrigins: config.CLIENT_ORIGIN, user: {
        additionalFields: {
            username: {
                defaultValue: '', required: false, type: 'string',
            },
        },
    },
});
