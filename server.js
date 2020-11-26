"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
} = require("./exercises/exercise-2");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1:
  //get users
  .get("/exercise-1/users", getUsers)
  //add new user
  .post("/exercise-1/users", addUser)

  // exercise 2
  //add greeting
  .post("/exercise-2/greeting", createGreeting)
  //new data =>
  .get("/exercise-2/:_id", getGreeting)
  //all greetings
  .get("/ex-2/greetings", getGreetings)
  //delete greetings
  .delete("/ex-2/greeting/:_id", deleteGreeting)
  //update greetings
  .put("ex-2/newgreeting/:id", updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
