import fp from 'fastify-plugin';
import helmet, { type FastifyHelmetOptions } from '@fastify/helmet';

/**
 * Security plugin that adds various HTTP headers to help protect the app
 *
 * @see https://github.com/fastify/fastify-helmet
 */
export default fp<FastifyHelmetOptions>(async (fastify) => {
    fastify.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
            },
        },
        crossOriginEmbedderPolicy: false,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
    });
});
