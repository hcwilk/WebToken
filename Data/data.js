const { MongoClient } = require("mongodb");
const fs = require("fs")
const privateKey = fs.readFileSync("../.secret").toString()
const axios = require('axios')

console.log(privateKey)
const uri =
// I'll give you the data key when we sync up
  `mongodb+srv://hcwilkinson:${privateKey}@cluster0.lwmy5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);


async function run() {
  try {

    axios.post('http://localhost:1337',
	{"UT": "Austin"}
	)
  }
  catch(error){
	console.log(error)
  }
}
run().catch(console.dir);

async function listdatabases(client){
	const list = await client.db().admin().listDatabases();
	console.log(list)
}