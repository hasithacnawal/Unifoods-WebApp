const config = require("config");
const jwt = require("jsonwebtoken");

function cardAuth(req, res, next) {
  const cardToken = req.header("x-card-token");

  //check for token
  if (!CardToken) {
    return res.status(401).json({ msg: "No token,authorization denied" });
  }
  try {
    //verify token
    const decoded = jwt.verify(cardToken, config.get("jwtSecret"));

    //add user from payload
    req.card = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "token is not valid"
    });
  }
}
module.exports = cardAuth;
