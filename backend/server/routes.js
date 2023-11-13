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

// Routing
const router = express.Router();

function send_json_res(res, _json)
{
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(_json));
}

router.get("/experiments", async function(req, res){
	let cur = m_col_experiments.find({}).project({name: 1, processor: 1, start_timestamp: 1, end_timestamp: 1, source_file: 1});
	expm_desc = [];
	for await(const doc of cur){
		doc.length = doc.end_timestamp - doc.start_timestamp;
		expm_desc.push(doc);
	}
	send_json_res(res, expm_desc);
});

module.exports = router;
