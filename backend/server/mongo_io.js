function save(col, data)
{ // не поддерживает вложенность... а это и не нужно
	for(e of data){
		for(key in e){
			let val = e[key];
			if(typeof val === "object" && val.$date)
				e[key] = new Date(val.$date);
		}
	}
	col.insertMany(data);
}

async function load(col)
{
	data = await col.find({}).toArray();
	for(e of data){
		for(key in e){
			let val = e[key];
			if(val instanceof Date)
				e[key] = {"$date": val.toISOString()};
		}
	}
	return data;
}

module.exports = {save, load};
