import express from 'express';
import { pune } from '../conf/geo-constants.js';
import getDebugger from '../utils/debug.js';
import { executeQuery } from '../utils/postgres.js';

const router = express.Router();

const debug = getDebugger('numadic-server:place-interactions');

/**
 * @openapi
 * /place_interactions:
 *   get:
 *     description: Returns list of vehicles which were inside configured polygon for the select time range.
 *     parameters:
 *       - in: query
 *         name: start_tis
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2018-09-08T18:30:00.000Z
 *         description: The start timestamp for the time range
 *       - in: query
 *         name: end_tis
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The end timestamp for the time range
 *     responses:
 *       200:
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   license:
 *                     type: string
 *                     description: License number of the vehicle
 *                   ewkt:
 *                     type: string
 *                     description: Well-known text representation of the vehicle's location
 *                     example: SRID=4326;POINT(73.805565 15.5948549)
 *                   ts:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp at which recorded
 */
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
