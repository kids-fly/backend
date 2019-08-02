const db = require("../database/dbConfig");

const postUser = async data => {
  const id = await db("users").insert(data)
  return await db("users")
    .where("id", id)
    .first();
};
const getUserByUsername = async username => {
  return await db("users")
    .where("username", username)
    .first();
};
module.exports = {
  postUser,
  getUserByUsername,
};
