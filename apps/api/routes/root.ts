import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const root: FastifyPluginAsyncZod = async (fastify, _opts): Promise<void> => {
    fastify.get(
        '/',
        {
            schema: {
                response: {
                    200: z.object({
                        message: z.string(),
                        version: z.string(),
                        timestamp: z.string(),
                    }),
                },
            },
        },
        async function (_request, _reply) {
            return {
                message: 'olhapi-stack API is running',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
            };
        },
    );
};

export default root;
