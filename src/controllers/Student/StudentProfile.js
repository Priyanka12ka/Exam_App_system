const studentprofilemodel = require("../../models/StudentModel/StudentProfile.js");

exports.viewprofile = async (req, res) => {
        const studentId = req.body.stud_id; 
        const response = await studentprofilemodel.viewstudentprofile(studentId);

        if ("result" in response) {
            res.status(200).json({ msg: response.result });
        } else {
            res.status(400).json({ msg: response.err });
        }
    
};
exports.updatestudentprofile=async(req,res)=>{
     const { stud_id, username, email, contact, password } = req.body;
    const response=await studentprofilemodel.updatestudentprofile(stud_id, username, email, contact, password);
    if("result" in response )
    {
        return res.status(200).json({msg:response.result});
    }
    else{
        res.status(400).json({msg:response.err});
    }
}