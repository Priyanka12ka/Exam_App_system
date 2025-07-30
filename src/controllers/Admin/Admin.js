const AdminModel = require("../../models//AdminModel/AdminModel.js");

exports.adminLogin = async(req, res) => {
    const { email, password } = req.body;
    let response=await AdminModel.checkEmailExists(email,password)
    {
        if("result" in response)
        {
            res.status(200).json({"response":response.result});
        }
        else{
            res.status(402).json({"response":response.err});
        }
    }

};
