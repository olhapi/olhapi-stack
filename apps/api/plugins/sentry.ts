import fp from 'fastify-plugin';
import * as Sentry from '@sentry/node';
import { type FastifyInstance } from 'fastify';
import { config } from '../config/app.ts';

/**
 * Sentry error tracking and performance monitoring
 *
 * @see https://docs.sentry.io/platforms/node/
 */
export default fp(async (fastify: FastifyInstance) => {
    // Initialize Sentry if DSN is provided
    if (config.SENTRY_DSN) {
        Sentry.init({
            dsn: config.SENTRY_DSN,
            environment: config.NODE_ENV,
            tracesSampleRate: config.NODE_ENV === 'production' ? 0.1 : 1,
            integrations: [Sentry.httpIntegration(), Sentry.expressIntegration()],
        });

        // Add Sentry request handler
        fastify.addHook('onRequest', async (request) => {
            Sentry.setContext('request', {
                method: request.method,
                url: request.url,
                headers: request.headers,
                ip: request.ip,
            });
        });

        // Add Sentry error handler
        fastify.addHook('onError', async (request, reply, error) => {
            Sentry.captureException(error, {
                tags: {
                    method: request.method,
                    url: request.url,
                },
                extra: {
                    headers: request.headers,
                    params: request.params,
                    query: request.query,
                },
            });
        });

        // Add Sentry to Fastify instance for manual error reporting
        fastify.decorate('sentry', Sentry);

        fastify.log.info('Sentry error tracking initialized');
    } else {
        fastify.log.warn('Sentry DSN not provided, error tracking disabled');
    }
});
