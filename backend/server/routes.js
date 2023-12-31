const express = require("express");
const { MongoClient, MongoBulkWriteError } = require("mongodb");
const fs = require('fs');
const log = require('npmlog');

const prep = require('./prep');
const mongo_io = require('./mongo_io');

const os = require('os');
const multer = require('multer');
const upload = multer({ dest: os.tmpdir() });

// Set up config
function generate_mongo_uri(ip, port, user, pwd)
{
	console.log("mongodb://" + user + ":" + pwd + "@" + ip + ":" + port)
	return "mongodb://" + user + ":" + pwd + "@" + ip + ":" + port;
}
const config = JSON.parse(fs.readFileSync("config.json"));

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

// Set up test data
async function setup_test_data()
{
	count = await m_col_experiments.count();
	if(count === 0)
		mongo_io.save(m_col_experiments, JSON.parse(fs.readFileSync("test_data.json")));
}
setup_test_data();

// Misc functions

function cycles_to_dict(cycles)
{
	out = [];
	for(c of cycles){
		d = {};
		for(mi of c)
			d[mi[0]] = mi[1];
		out.push(d);
	}
	return out;
}

// Routing
const router = express.Router();

router.get("/experiments", async function(req, res){
	let filters = prep.get_filters(req);
	page = prep.filters_expm(filters);
	let cur = m_col_experiments.find(filters);
	if(page.limit) cur = cur.limit(page.limit);
	if(page.offset) cur = cur.skip(page.offset);
	cur = cur.project({name: 1, processor: 1, start_timestamp: 1, end_timestamp: 1, source_file: 1});
	expm_desc = [];
	for await(const doc of cur){
		prep.doc_expm(doc);
		expm_desc.push(doc);
	}
	prep.send_json_res(res, expm_desc);
});

router.get("/experiments/:id", async function(req, res){
	let filters = prep.get_filters(req, "cycle_range");
	let proj = {};
	try {
		proj = prep.filters_expm_id(filters, req);
	} catch {
		prep.send_error(res, 400, "Invalid request");
		return;
	}
	if(!filters._id){
		prep.send_error(res, 400, "Invalid request");
		return;
	}
	doc = await m_col_experiments.findOne(filters, {projection: proj});
	if(!doc){
		prep.send_error(res, 404, "Experiment not found");
		return;
	}
	doc.pipeline.cycles = cycles_to_dict(doc.pipeline.cycles);
	doc.cycles = doc.pipeline.cycles;
	doc.instructions = doc.pipeline.instructions;
	delete doc.pipeline;
	delete doc._id;
	prep.send_json_res(res, doc);
});

router.get("/experiment_stats", async function(req, res){
	let filters = prep.get_filters(req);
	prep.filters_expm(filters);
	let cur = m_col_experiments.aggregate([
	{$match: filters
	},
	{$group: {_id: "avg",
		avg_time: {$avg: {$dateDiff:
			{ startDate: "$start_timestamp", endDate: "$end_timestamp", unit: "millisecond" }
			}},
		min_time: {$min: {$dateDiff:
			{ startDate: "$start_timestamp", endDate: "$end_timestamp", unit: "millisecond" }
			}},
		max_time: {$max: {$dateDiff:
			{ startDate: "$start_timestamp", endDate: "$end_timestamp", unit: "millisecond" }
			}},
		}
	}
	]);

	let doc = await cur.next();
	if(!doc){
		prep.send_error(res, 404, "None of experiments match the filter");
		return;
	}

	delete doc._id;
	prep.send_json_res(res, doc);
});

router.post("/import", upload.single("file"), async function(req, res){
	if(!req.file)
		return;
	try {
		data = JSON.parse(fs.readFileSync(req.file.path).toString());
	} catch(e) {
		prep.send_error(res, 400, "Invalid JSON data:\n" + e);
		return;
	}

	try {
		mongo_io.save(m_col_experiments, data);
	} catch(e) {
		if(e instanceof MongoBulkWriteError)
			prep.send_error(res, 400, "Invalid database entry:\n" + e);
		else if (e instanceof TypeError){
			data = [data];
			mongo_io.save(m_col_experiments, data);
		}
		else
			throw e;
	}
	prep.send_ok(res);
});
router.get("/export", async function(req, res){
	prep.send_json_res(res, await mongo_io.load(m_col_experiments));
});

module.exports = router;
