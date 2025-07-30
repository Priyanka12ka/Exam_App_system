const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/routes");

const app = express();

app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

module.exports = app;
