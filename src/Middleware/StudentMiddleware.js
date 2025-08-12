const jwt = require("jsonwebtoken");

exports.verifystudent = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ msg: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: "Token is invalid or expired" });
        }

        //  Attach student info to the request for controller to use
        req.student = decoded;
        next();
    });
};
