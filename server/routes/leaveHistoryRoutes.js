const Leave = require("../models/leave.js")

const express = require("express");
const { Login } = require("../models/user");
const {Student} = require("../models/studentmodel");
const router = express.Router();

router.get("/getAllLeaves" , async (req , res)=>{
    try {
        const id = req.query.id;
        const leaves = await Leave.find({ id: id });
        console.log(leaves);
        let array = [];
        leaves.forEach((leave)=>{
            console.log(leave.status);
            let object = {
                startDate: leave.startDate,
                endDate: leave.endDate,
                status : leave.status,
                reason:leave.reason,
                leave_id : leave.leaveId,
                leaveType : leave.leaveType,
            }
            array.push(object);
        })
        res.json({yourLeaves : array});
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;