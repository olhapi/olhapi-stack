import type { FastifyRequest } from 'fastify';

/**
 * Converts Fastify headers to standard Headers object format
 * @param fastifyHeaders - Headers from Fastify request
 * @returns Headers object compatible with Web API
 */
export function convertHeaders(fastifyHeaders: FastifyRequest['headers']): Record<string, string> {
    return Object.entries(fastifyHeaders).reduce(
        (acc, [key, value]) => {
            if (value) {
                acc[key] = Array.isArray(value) ? value.join(', ') : value.toString();
            }
            return acc;
        },
        {} as Record<string, string>,
    );
}

/**
 * Converts a Fastify request to a Web API Request object
 * @param request - Fastify request object
 * @returns Web API Request object
 */
export function fastifyToWebRequest(request: FastifyRequest): Request {
    const url = new URL(request.url, `${request.protocol}://${request.hostname}`);

    const requestInit: RequestInit = {
        headers: convertHeaders(request.headers), method: request.method,
    };

    // Only add body for non-GET requests
    if (request.method !== 'GET' && request.body) {
        requestInit.body = JSON.stringify(request.body);
    }

    return new Request(url.toString(), requestInit);
}

/**
 * Creates Web API compatible RequestInit from Fastify request
 * @param request - Fastify request object
 * @returns RequestInit object compatible with Web API
 */
export function createRequestInit(request: FastifyRequest): RequestInit {
    const requestInit: RequestInit = {
        headers: convertHeaders(request.headers), method: request.method,
    };

    // Only add body for non-GET requests
    if (request.method !== 'GET' && request.body) {
        requestInit.body = JSON.stringify(request.body);
    }

    return requestInit;
}
