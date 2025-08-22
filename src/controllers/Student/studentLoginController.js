const StudentModel = require("../../models/StudentModel/StudentRegisterLogin.js");

exports.registerStudent = async (req, res) => {
  const { username, contact, email, password } = req.body;

  let response = await StudentModel.registerStudent(username, contact, email, password );
  
  if ("result" in response) {
    res.status(201).json({ "msg": response.result });
  } else {
    res.status(400).json({ "msg": response.err });
  }
};

exports.loginStudent = async (req, res) => {
  const { username, password } = req.body;


  let response = await StudentModel.loginStudent(username, password);

  if ("result" in response) {
    res.status(201).json({ "msg": response.result });
  } else {
    res.status(400).json({ "msg": response.err });
  }
};
