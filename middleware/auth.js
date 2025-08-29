const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey123";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer token"
  // console.log(token);
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
