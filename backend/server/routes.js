const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require('fs');
const log = require('npmlog');

// Set up config
function generate_mongo_uri(ip, port, user, pwd)
{
	return "mongodb://" + user + ":" + pwd + "@" + ip + ":" + port;
}
const config = JSON.parse(fs.readFileSync('config.json'));

// Set up MongoDB
const mongo_client = new MongoClient(generate_mongo_uri(config.db.ip, config.db.port, config.db.user, config.db.pwd));
const m_db_ripes = mongo_client.db("ripes");
let m_col_experiments;
if(m_db_ripes)
	m_col_experiments = m_db_ripes.collection("experiments");
else{
	log.error("mongo", "Database 'ripes' doesn't exist");
	process.exit(1);
}
if(!m_col_experiments){
	log.error("mongo", "Collection 'experiments' doesn't exist");
	process.exit(1);
}

//m_col_experiments.findOne().then((res) => {
//	console.log(res);
//});

// Routing
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200);
	res.end("Test");
});

module.exports = router;
