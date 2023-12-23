const { ObjectId } = require("mongodb");

function send_json_res(res, _json)
{
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(_json));
}
function send_error(res, code, msg)
{
	res.statusCode = code;
	res.end(msg + "\n");
}
function send_ok(res)
{
	res.statusCode = 200;
	res.end();
}

function get_filters(req, header_name)
{
	if(!header_name) header_name = "filters";
	let filters = {};
	try{
		filters = JSON.parse(req.header(header_name));
	} catch {}
	return filters;
}

function filters_expm(filters)
{
	if(filters.id) filters._id = filters.id; 
	delete filters.id;
	if(filters.length !== undefined){
		filters["$expr"] = {
			$eq: [
				{ $dateDiff: {
					startDate: "$start_timestamp",
					endDate: "$end_timestamp",
					unit: "millisecond"
				}},
				filters.length
			]};
		delete filters.length;
	}

	if(filters.start_timestamp !== undefined){
		let tz_off = new Date().getTimezoneOffset() * 60000;
		filters.start_timestamp = {"$eq": new Date(new Date(filters.start_timestamp).getTime() - tz_off)};
	}
	if(filters.end_timestamp !== undefined){
		let tz_off = new Date().getTimezoneOffset() * 60000;
		filters.end_timestamp = {"$eq": new Date(new Date(filters.end_timestamp).getTime() - tz_off)};
	}

	limit = undefined, offset = undefined;
	if(filters.limit !== undefined){
		limit = filters.limit;
		delete filters.limit;
	}
	if(filters.offset !== undefined){
		offset = filters.offset;
		delete filters.offset;
	}
	return { limit, offset };
}
function filters_expm_id(filters, req)
{
	filters._id = ObjectId.createFromHexString(req.params.id);
	proj = {};
	if(filters.begin !== undefined && filters.end !== undefined){
		if(filters.begin > filters.end)
			filters.begin = filters.end;
		proj.pipeline = { cycles: {
					$slice: [filters.begin, filters.end - filters.begin + 1]}
					};
		delete filters.begin; delete filters.end;
	}
	return proj;
}

function doc_expm(expm)
{
	if(expm._id) expm.id = expm._id;
	delete expm._id;
	expm.length = expm.end_timestamp - expm.start_timestamp;
}

module.exports = {send_json_res, send_error, send_ok, get_filters, filters_expm, filters_expm_id, doc_expm};
