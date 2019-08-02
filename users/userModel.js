const db = require("../database/dbConfig");
const mapper = require("../helpers/mappers");
const userInfo = async data => {
  const isAdmin = data ? mapper(data.isAdmin) : mapper(data);
  return {
    ...data,
    isAdmin
  };
};
const getUsers = async id => {
  if (id) {
    data = await db("users")
      .where("id", id)
      .first();
    return userInfo(data);
  }
  data = await db("users");
  return data.map(user => userInfo(user));
};
const updateUser = async (userid, data) => {
  await db("users")
    .where("id", userid)
    .update(data);
  return getUsers(userid);
};
const getAllAdmins = async location => {
  return await db("users as us")
    .select(
      "us.id",
      "ad.id as admin_id",
      "us.firstname",
      "us.lastname",
      "ad.admin_location",
      "air.airport_location"
    )
    .join("admins as ad", "ad.user_id", "us.id")
    .join("airports as air", "ad.airport_id", "air.id")
    .where("air.airport_location", location);
};
module.exports = {
  getUsers,
  updateUser,
  getAllAdmins,
  
};
