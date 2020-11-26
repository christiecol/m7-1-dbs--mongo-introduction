const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const newUserBody = req.body;

  const dbName = "exercise_1";

  try {
    await client.connect();
    console.log("connected!");

    const db = client.db(dbName);

    const newUser = await db
      .collection("users")
      .insertOne({ name: newUserBody.name });

    console.log(newUser);

    const result = newUser.ops[0];

    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(404).json({ status: 404 });
  }

  client.close();
  console.log("disconnected!");
};

module.exports = { addUser };
