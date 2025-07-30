const express = require("express");
const router = express.Router();

const adminRoutes = require("./adminRoutes.js")
const studentrouter = require("./studentRoutes.js");

router.use("/admin", adminRoutes);
router.use("/students",studentrouter);

module.exports = router;
