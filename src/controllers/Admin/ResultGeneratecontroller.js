const resultgeneratormodel=require("../../models/AdminModel/ResultGeneratemodel");
exports.getResultByStudentId = async (req, res) => {
  const { studId } = req.body;  

  if (!studId) {
    return res.status(400).json({ msg: "studId is required" });
  }

  const response = await resultgeneratormodel.getResultByStudentId(studId);

  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};
