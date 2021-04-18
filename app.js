import express from 'express';
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Server for Numadic Full-Stack developer hiring',
            version: '1.0.0',
            license: {
                name: "MIT",
                url: "https://github.com/LordKa0S/numadic-server-apr21/blob/master/LICENSE",
            },
            contact: {
                name: "Kaustubh Badrike",
                url: "https://github.com/LordKa0S/numadic-server-apr21",
            },
        },
        servers: [
            {
                url: "https://numadic-apr21.herokuapp.com/",
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = await swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
