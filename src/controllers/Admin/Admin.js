const AdminModel = require("../../models/AdminModel/AdminModel.js");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    let response = await AdminModel.checkEmailExists(email, password);

    if ("result" in response) {
        const token = jwt.sign({ email: email, type: "admin" }, process.env.JWT_SECRET, { expiresIn: "30d" });
        return res.status(200).json({
            msg: "Login success", token: token, admin: response.result
        });
    } else {
        return res.status(401).json({ msg: "Login failed", error: response.err });
    }
};
