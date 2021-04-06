import express from 'express';
import getDebugger from '../utils/debug.js';
import { executeQuery } from '../utils/postgres.js';

const router = express.Router();

const debug = getDebugger('numadic-server:vehicle-activity');

/* GET users listing. */
router.get('/', async function (req, res) {
    const { query } = req;
    debug(query);
    const result = await executeQuery('SELECT * FROM vehicle_activity($1, $2, $3)', [
        query.license,
        query.start_tis,
        query.end_tis,
    ]);
    res.send(result);
});

export default router;
