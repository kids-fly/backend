const Admin = require("./adminModel");
const statusHandler = require("../helpers/statusHandler");
const User = require("../users/userModel");
const makeRemoveAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.getUsers(id);
    const newData = await User.updateUser(id, {
      isAdmin: !data.isAdmin
    });
    if (!newData.isAdmin) {
      await Admin.deleteAdminDetails(newData.id);
    }
    return statusHandler(res, 201, newData);
  } catch (err) {
    return statusHandler(res, 500, "Something went wrong");
  }
};
const addAdminDetails = async (req, res) => {
  const { userId } = req.params;
  const data = await User.getUsers(userId);
  const { airport_id, admin_location } = req.body;
  try {
    const newData = await Admin.postAdminDetials({
      user_id: data.id,
      airport_id,
      admin_location
    });
    return statusHandler(res, 201, newData);
  } catch (err) {
    return statusHandler(res, 500, "Something went wrong");
  }
};

module.exports = {
  makeRemoveAdmin,
  addAdminDetails
};
