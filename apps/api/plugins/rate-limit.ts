import fp from 'fastify-plugin';
import rateLimit, { type RateLimitPluginOptions } from '@fastify/rate-limit';
import { Redis } from 'ioredis';
import { config } from '../config/app.ts';

/**
 * Rate limiting plugin to prevent abuse
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<RateLimitPluginOptions>(async (fastify) => {
    const redis = config.REDIS_URL
        ? new Redis(config.REDIS_URL, {
              connectTimeout: 500,
              maxRetriesPerRequest: 1,
          })
        : undefined;

    fastify.register(rateLimit, {
        ban: 2, errorResponseBuilder: (req, context) => {
            return {
                code: 429, date: Date.now(), error: 'Too Many Requests', expiresIn: context.ttl, message: `Rate limit exceeded, retry in ${context.ttl} milliseconds.`,
            };
        }, keyGenerator: (req) => {
            return req.ip;
        }, max: config.RATE_LIMIT_MAX, redis, skipOnError: false, timeWindow: '1 minute',
    });
});
