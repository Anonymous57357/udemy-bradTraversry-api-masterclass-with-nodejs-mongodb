const jwt = require("jsonwebtoken");

const User = require("./../models/UserModel");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Make sure token is exists
  if (!token) {
    return res
      .status(401)
      .json({ success: false, messag: "Not authorize to access this route" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SCERET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      messag: "Not authorize to access this route",
    });
  }
};
