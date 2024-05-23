const User = require("./../models/UserModel");

// @desc   Register user
// @desc   POST /api/v1/auth/register
// @access Public

const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
};

// @desc   POST /api/v1/auth/login
// @access Public

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and passsword
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });

  // check the user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Credentials" });
  }

  // check if password is match
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ succes: false, message: "Invalid Credentials" });
  }

  sendTokenResponse(user, 200, res);

  try {
    res.status(200).json({
      success: true,
      token,
      message: "user login successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create a token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = {
  register,
  login,
};
