const express = require('express');

const server = express();

server.use(express.json());

server.use('/v1', require('./routes'));

module.exports = server;