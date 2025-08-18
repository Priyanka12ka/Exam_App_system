
const SubjectModel = require("../../models/AdminModel/SubjectModel.js");

exports.addSubject = async (req, res) => {
    const { name } = req.body;
    const response = await SubjectModel.addSubject(name);
    if ("result" in response) {
        res.status(201).json({ msg: response.result });
    } else {
        res.status(400).json({ msg: response.err });
    }
};

exports.getAllSubjects = async (req, res) => {
    const response = await SubjectModel.getAllSubjects();
    
    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(500).json({ msg: response.err });
    }
};

exports.getsubjectbyid=async(req,res)=>
{
    const subject_id=req.body.subject_id;
    const response=await SubjectModel.getSubjectById(subject_id);
    
    if("result" in response)
    {
        res.status(200).json({data:response.result});
    }
    else
    {
        res.status(500).json({msg:response.err});
    }

}
exports.updateSubject = async (req, res) => {
    const { subject_id, name } = req.body;
    const response = await SubjectModel.updateSubject(subject_id, name);
    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.deleteSubject = async (req, res) => {
    const { subject_id } = req.body;
    const response = await SubjectModel.deleteSubject(subject_id);
    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};

exports.searchSubjectByName = async (req, res) => {
    const { name } = req.body;

    const response = await SubjectModel.searchSubjectByName(name);

    if ("result" in response) {
        res.status(200).json({ data: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};
