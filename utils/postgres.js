import pg from 'pg';
import getDebugger from './debug.js';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const debug = getDebugger('numadic-server:postgres');

export const executeQuery = async (
    queryText,
    values,
) => {
    debug(process.env.DATABASE_URL);
    const queryArray = await pool.query(queryText, values);
    return queryArray.rows;
}

export const dispose = () => {
    return pool.end();
}