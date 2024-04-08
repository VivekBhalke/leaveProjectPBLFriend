const express = require("express");
const { Login } = require("../models/user");
const Student = require("../models/studentmodel");
const Leave = require('../models/leave');
const router = express.Router();

router.post("/getDetails" , async  (req,res)=>{
    console.log("get Details route hitted ");
    const parentKeStudentKaNo = req.body.parentKeStudentKaNo;
    try {
        const student = await Student.find({rollno : parentKeStudentKaNo});
        
        const leaves = await Leave.find({id : student[0].id});
        const formattedLeaves = leaves.map(leave => ({
            startDate: leave.startDate,
            endDate: leave.endDate,
            leaveCount: leave.leaveCount,
            status : leave.status,
            reason:leave.reason,
            leave_id : leave.leaveId
        }));
        const studentWithLeaves = {
            name: student[0].name,
            student_id:student[0].id,
            leaves: formattedLeaves
        };
        return res.json({studentData : studentWithLeaves});
    } catch (error) {
        return res.json({error : "thre was an error"});
    }
})

module.exports = router;