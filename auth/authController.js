const User = require("./authModel");
const crypted = require("../middleware/encryption");
const statusHandler = require("../helpers/statusHandler");
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkInfo = await User.getUserByUsername(username);
    if (!!checkInfo) {
      return statusHandler(res, 400, "Username already exists");
    }
    const hashedPassword = crypted.hashPassword(password);
    await User.postUser({ username, password: hashedPassword });
    return statusHandler(res, 201, "User Registration Successful");
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkInfo = await User.getUserByUsername(username);
    if (!checkInfo) {
      return statusHandler(res, 404, "Username Does Not Exist");
    }
    if (!crypted.comparePassword(password, checkInfo.password)) {
      return statusHandler(res, 400, "Wrong Password");
    }
    const token = crypted.generateToken(checkInfo);

    return statusHandler(res, 200, {
      status: "Login Succesful",
      message: `Welcome ${checkInfo.username}`,
      token, 
    });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};


module.exports = {
  register,
  login,
};
