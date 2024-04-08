const express = require("express");
const { Login } = require("../models/user");
const Student = require("../models/studentmodel");
const Leave = require('../models/leave');
const router = express.Router();
router.get('/me', async (req, res) => {
    const userId = req.query.id; // Get the ID from the query parameters
    try {
      const user = await Student.findOne({id:userId});
      const leaves = await Leave.find({id : userId});
      const leaveCount = leaves.length;
      if (user) {
        // If user found, send back the user data
        const object = {
            rollno:user.rollno,
            username:user.name,
            leaveCount:leaveCount,
            email:user.email,
            roomno:user.hostelroomno
        }
        res.json(object);
      } else {
        // If user not found, send back an error response
        res.status(404).json({ message: 'please login first' });
      }
    } catch (error) {
      // If an error occurs during the database query, send back an error response
      console.error('Error occurred while fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.put('/updateLeaveTotal', async (req, res) => {
    const { id } = req.body;
    console.log("route hitted")
    try {
      const student = await Student.findOne({id:id});
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Update total leave for the student
      student.leaveCount = student.leaveCount+1;
      await student.save();
  
      return res.status(200).json({ message: 'Total leave updated successfully' });
    } catch (error) {
      console.error('Error updating total leave:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// const Student = require('../models/student');


router.get('/students', async (req, res) => {
  // const studentId = req.query.id;

  try {
    // Fetch all student information
    const students = await Student.find({});

    if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No students found' });
    }

    // Array to store formatted student data
    const formattedStudents = [];

    // Iterate over each student
    for (const student of students) {
        // Fetch leaves associated with the student
        const leaves = await Leave.find({ id: student.id });

        // Format leave data
        const formattedLeaves = leaves.map(leave => ({
            startDate: leave.startDate,
            endDate: leave.endDate,
            leaveCount: leave.leaveCount,
            status : leave.status,
            reason:leave.reason,
            leave_id : leave.leaveId
        }));

        // Construct student object with leavesparentKeStudentKano
        const studentWithLeaves = {
            name: student.name,
            student_id:student.id,
            leaves: formattedLeaves
        };

        // Add student object to the array
        formattedStudents.push(studentWithLeaves);
    }

    // Send the formatted student data as response
    res.json(formattedStudents);
} catch (error) {
    res.status(500).json({ message: error.message });
}

});

router.post("/getRegsistrationDetails" , async  (req , res)=>{
  const name =  req.body.name
  const email =  req.body.email
  const rollno =  req.body.rollno
  const hostelroomno =  req.body.hostelroomno
  const id = req.body.user_id
  if(name && hostelroomno && rollno && email && id )
  {
    const object = {name , email,rollno,hostelroomno,id , leaveCount : 0}
    try {
      console.log("reached here");
      console.log(object);
      const newStudent = new Student(object);
      console.log("student created");
      const savedStudent = await newStudent.save();
      console.log("got the saved studnet");
      return res.json({result : true})
  
    } catch (error) {
      console.log(error);
      return res.json({message : "you got error"})
    }
    
  }else{
    console.log("provide all filed");
    res.json({message :"please provide all fields"})
  }
  
})

module.exports = router;


  