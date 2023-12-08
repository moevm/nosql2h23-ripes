const express = require('express');
const routes = require('./routes');
const fs = require('fs');
const log = require('npmlog');
const cors = require('cors')

const config = JSON.parse(fs.readFileSync('config.json'));
const server = express();

server.use(cors())
server.use(express.json());
server.use('/', routes);
server.listen(config.port, config.ip, () => {
	log.info("server", "Listening to " + config.ip + ":" + config.port);
});
