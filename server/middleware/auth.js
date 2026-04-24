const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  // No token
  if (!token) {
    return res.status(401).json({ msg: "Access Denied. No Token." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified; // attach user data
    next(); // move to next function
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};