const jwt = require("jsonwebtoken");

exports.verifyadmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Forbidden: Invalid token" });
    }
    req.admin = decoded;
    next();
  });
};
