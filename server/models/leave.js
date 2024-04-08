const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  hostelNo: { type: String, required: true },
  email: { type: String, required: true },
  leaveType: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, required: true },
  reason: { type: String, required: true },
  id: { type: Number, required: true },
  leaveId : {
    type : Number,
    required:true  }
});

const Leave = mongoose.model('Leave', LeaveSchema);

module.exports = Leave;

