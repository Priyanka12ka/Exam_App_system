const jwt = require("jsonwebtoken");

exports.verifystudent = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ msg: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token missing" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Token invalid or expired" });

        if (decoded.role !== "student") {
            return res.status(403).json({ msg: "Access denied. Not a student token" });
        }

        req.user = decoded; // <--- use req.user consistently
        next();
    });
};

