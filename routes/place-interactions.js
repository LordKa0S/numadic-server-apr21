import express from 'express';
import { pune } from '../conf/geo-constants.js';
import getDebugger from '../utils/debug.js';
import { executeQuery } from '../utils/postgres.js';

const router = express.Router();

const debug = getDebugger('numadic-server:place-interactions');

/* GET users listing. */
router.get('/', async function (req, res) {
    const { query } = req;
    debug(query);
    const result = await executeQuery('SELECT * FROM place_interactions($1, $2, $3)', [
        query.start_tis,
        query.end_tis,
        pune,
    ]);
    res.send(result);
});

export default router;
