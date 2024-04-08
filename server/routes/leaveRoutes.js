const Leave = require("../models/leave.js")

const express = require("express");
const { Login } = require("../models/user");
const {Student} = require("../models/studentmodel");
const router = express.Router();
router.post('/applyleave', async (req, res) => {
    console.log("applyleave route hitted")
    // Extract data from the request body
    const { name, rollNo, hostelNo, email, leaveType, startDate, endDate, status,reason } = req.body;
    const id = req.query.id;
    let leaveId;
    try {
        
        const leaves = await Leave.find({ id: id });
        console.log(leaves);
        // [{} , {} , {}]
        if(leaves.length == 0)
        {
            console.log("leaves.lengt his zeor")
            leaveId = 1;
        }else{
            console.log("leaves.length > 0 ");
            console.log(leaves.length);
            leaveId = leaves.length + 1;
        }
        
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    try {
        // Save the leave document to the database
        console.log("name is :" , name);

        
        const leave = new Leave({ name, rollNo, hostelNo, email, leaveType, startDate, endDate, status,reason , id,leaveId });
        const savedLeave = await leave.save();
        res.status(201).json(savedLeave);
     
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post("/updateStatus" , async (req,res)=>{
    const id = req.body.student_id;
    const leaveId = req.body.leave_id;
    const status = req.body.status;
    console.log("update stauts route is hitted");
    try {
        // Find the leave by id and leaveId
        const leave = await Leave.findOneAndUpdate(
            { id: id, leaveId: leaveId }, // Filter
            { status: status }, // Update
            { new: true } // Options to return the updated document
        );

        if (leave) {
            // Leave found and updated successfully
            console.log('Leave status updated:', leave);
            res.status(200).json({ result: 'Leave status updated successfully' });
        } else {
            // Leave not found
            console.log('Leave not found');
            res.status(404).json({ message: 'Leave not found' });
        }
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})
router.post("/getApprovedRejected" , async (req,res)=>{
    const id = req.body.id;
    console.log(id);
    try {
        const rejectedLeaves = await Leave.find({id : id , status : "Rejected"} );
        const approvedLeaves = await Leave.find({id : id , status : "Approved"} );
        const pendingLeaves = await Leave.find({id : id , status : "Pending"} );
        const object = { rejected : rejectedLeaves.length , approved : approvedLeaves.length  , pending : pendingLeaves.length};
        res.json({yourLeaves : object});
    } catch (error) {
        res.json({error : "there was an eorr"});
    }
});
module.exports=router