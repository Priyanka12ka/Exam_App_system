const setQuestionEntryModel = require("../../models/AdminModel/AssignQuestionTo_QueSetModel");
exports.addQuestionToSet = async (req, res) => {
    const { setID, questionID } = req.body;

    let response = await setQuestionEntryModel.addQuestionToSet(setID, questionID);

    if ("result" in response) {
        console.log(response.result); 
        res.status(201).json({ msg: response.result });
    } else {
        console.log(response.err);
        res.status(400).json({ msg: response.err });
    }
};


exports.getQuestionsInSet = async (req, res) => {
  const { setID } = req.query;
  if (!setID) {
    return res.status(400).json({ msg: "setID is required in query params" });
  }
  let response = await setQuestionEntryModel.getQuestionsInSet(setID);
  if ("result" in response) {
    res.status(200).json({ data: response.result });
  } else {
    res.status(404).json({ msg: response.err });
  }
};

exports.removeQuestionFromSet = async (req, res) => {
    const { setID, questionID } = req.body;

    if (!setID || !questionID) {
        return res.status(400).json({ msg: "setID and questionID are required" });
    }

    let response = await setQuestionEntryModel.removeQuestionFromSet(setID, questionID);

    if ("result" in response) {
        res.status(200).json({ msg: response.result });
    } else {
        res.status(404).json({ msg: response.err });
    }
};
