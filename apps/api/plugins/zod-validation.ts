import fp from 'fastify-plugin';
import { type FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';

export interface ZodValidationPluginOptions {}

const zodValidationPlugin: FastifyPluginAsync<ZodValidationPluginOptions> = async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof ZodError) {
            return reply.status(400).send({
                error: 'Validation Error',
                message: 'Invalid request data',
                details: error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                    code: issue.code,
                })),
            });
        }

        // Forward to default error handler for other errors
        reply.send(error);
    });
};

export default fp(zodValidationPlugin, {
    name: 'zod-validation',
});
