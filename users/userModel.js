const db = require("../database/dbConfig");
const mapper = require("../helpers/mappers");
const userInfo = data => {
  return {
    ...data,
    isAdmin: mapper(data.isAdmin)
  };
};
const getUsers = async id => {
  let data;
  if (id) {
    data = await db("users")
      .where("id", id)
      .first();
    return userInfo(data);
  }
  data = await db("users");
  return data.map(user => userInfo(user));
};
const updateUser = async (id, data) => {
  const [id] = await db("users")
    .where("id", id)
    .update(data);
  return getUsers(id);
};

module.exports = {
  getUsers,
  updateUser
};
