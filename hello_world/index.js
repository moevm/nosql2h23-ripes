import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const _db = client.db("hello_world");
const nic_meetings = _db.collection("nic_meetings");

async function hello_write()
{
	const new_meeting = {
		date: "2023-09-24T10:29",
		theme: "Welcome Training Meeting"
	};
	const res = await nic_meetings.insertOne(new_meeting);
	console.log("Insertion result:", res);
	return res.insertedId;
}
async function hello_read(id)
{
	const res = await nic_meetings.findOne(id);
	console.log("Find result:", res);
}

async function hello_world()
{
	const id = await hello_write();
	await hello_read(id);
}
hello_world();
