import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config/app.ts';
import * as authSchema from '../lib/auth/auth-schema.ts';

const pool = new Pool({
    connectionString: config.DATABASE_URL,
});

export const db = drizzle(pool, { schema: authSchema });
