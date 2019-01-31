'use strict';

const Hapi = require('hapi');
const path = require('path');

const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost'
});

const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: path.join(__dirname, './client/build'),
                listing: false,
                index: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {

            return 'api';
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();