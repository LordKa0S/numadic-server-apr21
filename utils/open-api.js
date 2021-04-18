import swaggerJsdoc from 'swagger-jsdoc';

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

const openapiSpecification = await swaggerJsdoc(options);

export default openapiSpecification;
