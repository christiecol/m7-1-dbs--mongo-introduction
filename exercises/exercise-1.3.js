const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const dbName = "exercise_1";

  await client.connect();
  console.log("connected!");

  const db = client.db(dbName);

  const users = await db.collection("users").find().toArray();
  console.log(users);

  if (!users || users == []) {
    res.status(404).type("txt").send("🤷‍♂️");
  } else {
    res.status(200).json({ status: 200, data: users });
  }

  client.close();
  console.log("disconnected!");
};

module.exports = { getUsers };
