const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const dbName = "exercise_1";

  try {
    await client.connect();
    console.log("connected!");

    const db = client.db(dbName);

    const result = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, result.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

const getGreeting = async (req, res) => {
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected!");

  const dbName = "exercise_1";
  const db = client.db(dbName);

  await db.collection("greetings").findOne({ _id }, (err, result) => {
    console.log(result);
    if (err) {
      res.status(404).json({ status: 404, _id, data: err.message });
    } else {
      result
        ? res.status(200).json({ status: 200, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: err.message });
    }
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected!");

  const dbName = "exercise_1";
  const db = client.db(dbName);

  await db
    .collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;
        const end = cleanStart + (Number(req.query.limit) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;
        const data = result.slice(cleanStart, cleanEnd);
        res.status(200).json({ status: 200, data: data });
      } else {
        res.status(400).json({ status: 404, data: "Not Found" });
      }
      client.close();
    });
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected!");

  const dbName = "exercise_1";
  const db = client.db(dbName);

  try {
    await db.collection("greetings").deleteOne({ _id: _id });
    res.status(204).json({ status: 204, message: "Greeting Deleted" });
  } catch (err) {
    res.status(404).json({ status: 404 });
  }
};

const updateGreeting = async (req, res) => {
  const { _id } = req.params._id;
  const { hello } = req.body;

  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "Only update hello",
    });
    return;
  }

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const dbName = "exercise_1";
    const db = client.db(dbName);

    const query = { _id };
    const newValues = { $set: { hello } };
    const result = await db.collection("greetings").updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, results.modifiedCount);

    res.status(200).json({ status: 200, _id, result });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
