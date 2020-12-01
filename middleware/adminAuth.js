const config = require("config");
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const adminToken = req.header("x-adminAuth-token");

  //check for token
  if (!adminToken) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  }
  try {
    //verify token
    const decoded = jwt.verify(adminToken, config.get("jwtSecret"));

    //add admin from payload
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "token is not valid"
    });
  }
}
module.exports = adminAuth;
