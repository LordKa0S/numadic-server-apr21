import pg from 'pg';
import getDebugger from './debug.js';

const { Pool } = pg;

const pool = new Pool();

const debug = getDebugger('numadic-server:postgres');

export const executeQuery = async (
    queryText,
    values,
) => {
    debug(process.env.PGHOST);
    const queryArray = await pool.query(queryText, values);
    return queryArray.rows;
}

export const dispose = () => {
    return pool.end();
}