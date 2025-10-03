import { join } from 'node:path';
import AutoLoad, { type AutoloadPluginOptions } from '@fastify/autoload';
import type { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { auth } from './lib/auth/auth.ts';
import fastifyCors from '@fastify/cors';
import { config } from './config/app.ts';
import closeWithGrace from 'close-with-grace';
import { createSanitizedError } from './lib/utils/error-handling.ts';
import { fastifyToWebRequest } from './lib/utils/request-conversion.ts';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    // Add Zod type provider support
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    // Configure CORS policies (must be registered before routes)
    await fastify.register(fastifyCors, {
        origin: (origin, callback) => {
            if (!origin) {
                // Allow requests without origin (direct browser navigation, so magic links work)
                return callback(null, true);
            }

            // Check if the origin is in our allowed list
            if (config.CLIENT_ORIGIN.includes(origin)) {
                return callback(null, true);
            }

            // Reject the origin
            return callback(new Error('Not allowed by CORS'), false);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true,
        maxAge: 86400,
    });

    // Register authentication endpoint
    fastify.route({
        method: ['GET', 'POST'],
        url: '/api/auth/*',
        async handler(request, reply) {
            try {
                // Convert Fastify request to Web API request
                const req = fastifyToWebRequest(request);

                // Process authentication request
                const response = await auth.handler(req);

                // Forward response to client
                reply.status(response.status);
                for (const [key, value] of response.headers) {
                    reply.header(key, value);
                }
                reply.send(response.body ? await response.text() : null);
            } catch (error) {
                const sanitizedError = createSanitizedError(
                    'AUTHENTICATION_ERROR',
                    fastify.log,
                    error,
                    'auth-handler',
                    'AUTH_FAILURE',
                );
                reply.status(500).send(sanitizedError);
            }
        },
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    await fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    await fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts,
    });
};

export default app;
export { app, options };

// Add graceful shutdown handling
closeWithGrace({ delay: 500 }, async function ({ signal, err }) {
    if (err) {
        console.error('Error during shutdown:', err);
    }
    console.log(`Received ${signal}, shutting down gracefully...`);
});
