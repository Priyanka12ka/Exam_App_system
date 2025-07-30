const StudentModel = require("../../models/StudentModel/StudentRegisterLogin.js");

exports.registerStudent = async (req, res) => {
  const { name, contact, email, username, password } = req.body;

  let response=await StudentModel.registerStudent(name, contact, email, username, password);
  if("result" in response)
  {
    res.status(201).json({"msg":response.result})
  }
  else{
    res.status(400).json({"msg":response.err})
  }

};

exports.loginStudent = async(req, res) => {
  const { username, password } = req.body;
    let response=await StudentModel.loginStudent( username, password);
  if("result" in response)
  {
    res.status(201).json({"msg":response.result})
  }
  else{
    res.status(400).json({"msg":response.err})
  }
};

