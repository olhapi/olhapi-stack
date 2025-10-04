import fp from 'fastify-plugin';
import { type FastifyPluginAsync, type FastifyReply, type FastifyRequest } from 'fastify';
import { handleRequest } from 'better-upload/server';
import { uploadRouter } from '../config/upload-router.ts';
import { auth } from '../lib/auth/auth.ts';
import { fromNodeHeaders } from 'better-auth/node';
import { config } from '../config/app.ts';
import { createSanitizedError } from '../lib/utils/error-handling.ts';
import { fastifyToWebRequest } from '../lib/utils/request-conversion.ts';

const uploadPlugin: FastifyPluginAsync = async (fastify) => {
    // Unified upload handler for all routes
    const uploadHandler = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // Check authentication before processing upload (if required)
            if (config.UPLOAD_AUTH_REQUIRED) {
                const sessionResult = await auth.api.getSession({
                    headers: fromNodeHeaders(request.headers),
                });

                if (!sessionResult || !sessionResult.user || !sessionResult.session) {
                    const sanitizedError = createSanitizedError(
                        'AUTHENTICATION_ERROR',
                        fastify.log,
                        new Error('Authentication required for file uploads'),
                        'upload-auth',
                        'AUTH_REQUIRED',
                    );
                    reply.status(401).send(sanitizedError);
                    return;
                }
            }

            // Convert Fastify request to Web API request
            const webRequest = fastifyToWebRequest(request);

            const response = await handleRequest(webRequest, uploadRouter);
            let responseText = await response.text();

            reply.status(response.status).headers(Object.fromEntries(response.headers.entries())).send(responseText);
        } catch (error) {
            const sanitizedError = createSanitizedError('UPLOAD_ERROR', fastify.log, error, 'upload', 'UPLOAD_FAILED');
            reply.status(500).send(sanitizedError);
        }
    };

    // Register upload routes
    fastify.post('/api/upload', uploadHandler);

    // Health check endpoint
    fastify.get('/api/upload/health', async () => {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    });
};

export default fp(uploadPlugin, {
    name: 'upload',
});
