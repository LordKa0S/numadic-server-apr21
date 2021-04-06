import express from 'express';
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';

import placeInteractionRouter from './routes/place-interactions.js';
import vehicleActivityRouter from './routes/vehicle-activity.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.set('json spaces', 2);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(cors())

app.use('/place_interactions', placeInteractionRouter);
app.use('/vehicle_activity', vehicleActivityRouter);

export default app;
