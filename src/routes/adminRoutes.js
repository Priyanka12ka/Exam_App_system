const express = require("express");
const AdminController = require("../controllers/Admin/Admin.js");

const AdminRouter = express.Router();

AdminRouter.post("/register", AdminController.adminLogin);

module.exports = AdminRouter;
