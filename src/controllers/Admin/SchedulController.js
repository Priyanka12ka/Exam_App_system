
const scheduleModel=require("../../models/AdminModel/ScheduleModel.js");

exports.addSchedule=async (req,res)=>{
    const {title, date, start_time, end_time, duration_minutes, exam_id, subject_id} = req.body;
    let response=await scheduleModel.addSchedule(title, date, start_time, end_time, duration_minutes, exam_id, subject_id);
    if("result" in response)
    {
        res.status(201).json({"msg":response.result});
    }
    else{
        res.status(400).json({"msg":response.err});
    }


}