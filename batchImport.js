var fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");

const greetings = require("./data/greetings.json");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,

  useUnifiedTopology: true,
};

// const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);

  const dbName = "exercise_1";

  try {
    await client.connect();

    console.log("connected!");

    const db = client.db(dbName);

    console.log("*****");

    const result = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, result.insertedCount);

    console.log({ status: 201, data: result });
  } catch (err) {
    console.log({ status: 500, message: err.message });
  }

  client.close();

  console.log("disconnected!");
};

batchImport();
