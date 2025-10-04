import { type FastifyPluginAsyncZod, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { db } from '../db/db.ts';
import { user } from '../lib/auth/auth-schema.ts';
import { eq } from 'drizzle-orm';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth/auth.ts';
import { sendContactFormEmail } from '../services/email.ts';

const apiRoutes: FastifyPluginAsyncZod = async (fastify, _opts): Promise<void> => {
    // Register all API routes under /api prefix
    await fastify.register(
        async function (fastify) {
            // Username availability check
            fastify.withTypeProvider<ZodTypeProvider>().get(
                '/user/username/check',
                {
                    schema: {
                        querystring: z.object({
                            username: z
                                .string()
                                .min(3, 'Username must be at least 3 characters')
                                .max(30, 'Username must be less than 30 characters')
                                .regex(
                                    /^[a-zA-Z0-9_-]+$/,
                                    'Username can only contain letters, numbers, underscores, and hyphens',
                                ),
                        }),
                        response: {
                            200: z.object({
                                available: z.boolean(),
                                message: z.string(),
                            }),
                        },
                    },
                },
                async function (request, reply) {
                    try {
                        const { username } = request.query;

                        // Get current user session
                        const session = await auth.api.getSession({
                            headers: fromNodeHeaders(request.headers),
                        });

                        // If checking own username, mark as available
                        if (session?.user && 'username' in session.user && session.user.username === username) {
                            return reply.code(200).send({
                                available: true,
                                message: 'Username is available',
                            });
                        }

                        // Check if username exists in database
                        const existingUser = await db
                            .select({ id: user.id })
                            .from(user)
                            .where(eq(user.username, username))
                            .limit(1);

                        const available = existingUser.length === 0;

                        return reply.code(200).send({
                            available,
                            message: available ? 'Username is available' : 'Username is already taken',
                        });
                    } catch (error) {
                        fastify.log.error(`Username check error: ${String(error)}`);
                        return reply.code(200).send({
                            available: false,
                            message: 'Error checking username availability',
                        });
                    }
                },
            );

            // Contact form submission
            fastify.withTypeProvider<ZodTypeProvider>().post(
                '/contact',
                {
                    config: {
                        rateLimit: {
                            max: 3, // Allow only 3 contact form submissions per minute
                            timeWindow: '1 minute',
                        },
                    }, schema: {
                        body: z.object({
                            email: z
                                .email('Please enter a valid email address')
                                .max(254, 'Email address is too long')
                                .transform((str) => str.trim().toLowerCase()), message: z
                                .string()
                                .min(1, 'Message is required')
                                .max(2000, 'Message must be 2000 characters or less')
                                .transform((str) => str.trim()), name: z
                                .string()
                                .min(1, 'Name is required')
                                .max(100, 'Name must be 100 characters or less')
                                .transform((str) => str.trim()),
                        }),
                        response: {
                            200: z.object({
                                message: z.string(), success: z.boolean(),
                            }),
                            400: z.object({
                                error: z.string(),
                                message: z.string(),
                            }),
                            429: z.object({
                                code: z.number(), date: z.number(), error: z.string(), expiresIn: z.number(), message: z.string(),
                            }),
                            500: z.object({
                                error: z.string(),
                                message: z.string(),
                            }),
                        },
                    },
                },
                async function (request, reply) {
                    try {
                        const { name, email, message } = request.body as {
                            name: string;
                            email: string;
                            message: string;
                        };

                        // Send the email
                        await sendContactFormEmail({ email, message, name });

                        fastify.log.info(`Contact form submitted by ${email} from ${name}`);

                        return reply.code(200).send({
                            message: "Thank you for your message! We'll get back to you soon.", success: true,
                        });
                    } catch (error) {
                        fastify.log.error(`Contact form submission error: ${String(error)}`);
                        return reply.code(500).send({
                            error: 'SUBMISSION_FAILED',
                            message: 'Sorry, there was an error sending your message. Please try again later.',
                        });
                    }
                },
            );
        },
        { prefix: '/api' },
    );
};

export default apiRoutes;
