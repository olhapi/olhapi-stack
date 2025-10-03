import { test } from 'node:test';
import * as assert from 'node:assert';

import Fastify from 'fastify';
import Support from '../../plugins/support.ts';

test('support works standalone', async (_t) => {
    const fastify = Fastify();
    await fastify.register(Support);
    await fastify.ready();

    assert.equal(fastify.someSupport(), 'hugs');
});
