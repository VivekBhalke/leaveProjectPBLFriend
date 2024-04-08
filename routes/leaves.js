const express = require('express');
const Leave = require('../models/Leave');

const router = express.Router();

// Add a leave
router.post('/', async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).send(leave);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all leaves
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find({});
    res.send(leaves);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get leaves by username
router.get('/:username', async (req, res) => {
  try {
    const leaves = await Leave.find({ username: req.params.username });
    res.send(leaves);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a leave
// router.put('/:id', async (req, res) => {
//   try {
//     const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!leave) {
//       return res.status(404).send('Leave not found');
//     }
//     res.send(leave);}
// catch{

// }})