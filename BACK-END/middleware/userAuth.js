const jwt = require('jsonwebtoken')
require('dotenv').config()

async function auth(req,res,next) {
     const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired, please log in again." });
      }
      return res.status(403).json({ message: "Forbidden - Invalid Token" });
    }
    req.User = user;
    next();
  });
}

module.exports = auth