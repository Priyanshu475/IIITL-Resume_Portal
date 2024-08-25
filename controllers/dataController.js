const Data = require('../models/dataModel')
const mongoose = require('mongoose')

const getDatas = async (req, res) => {
  try {
    const user = req.user;
    let datas;
    if (user.role === 'admin') {
      datas = await Data.find().populate('user_id');
    } else {
      datas = await Data.find({ user_id: user._id })
        .sort({ createdAt: -1 });
      console.log('User Data:', datas); // Log the data fetched for non-admin users
    }

    res.status(200).json(datas);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data. Please try again later.' });
  }
};

// create new data
const createData = async (req, res) => {
  const { FullName, Rollno, BatchYear, Branch, ResumeLink, CGPA, ActiveBacklogs } = req.body

  let emptyFields = []

  if (!FullName) {
    emptyFields.push('FullName')
  }

  if (!Rollno) {
    emptyFields.push('Rollno')
  }
  if (!BatchYear) {
    emptyFields.push('BatchYear')
  }
  if (!Branch) {
    emptyFields.push('Branch')
  }
  if (!ResumeLink) {
    emptyFields.push('ResumeLink')
  }
  if (CGPA === undefined || CGPA === '') {
    emptyFields.push('CGPA')
  }
  if (ActiveBacklogs === undefined || ActiveBacklogs === '') {
    emptyFields.push('ActiveBacklogs')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // Validate CGPA
  const cgpaValue = parseFloat(CGPA)
  if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10 || Number.isInteger(cgpaValue)) {
    return res.status(400).json({ error: 'CGPA must be a decimal number between 0 and 10' })
  }

  // Validate ActiveBacklogs
  const activeBacklogsValue = parseInt(ActiveBacklogs)
  if (isNaN(activeBacklogsValue) || activeBacklogsValue < 0 || !Number.isInteger(activeBacklogsValue)) {
    return res.status(400).json({ error: 'Active Backlogs must be a non-negative integer' })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const data = await Data.create({
      FullName,
      Rollno,
      BatchYear, 
      Branch, 
      ResumeLink, 
      CGPA: cgpaValue, 
      ActiveBacklogs: activeBacklogsValue,
      user_id
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a data
const deleteData = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const data = await Data.findOneAndDelete({_id: id})

  if (!data) {
    return res.status(400).json({error: 'No such data'})
  }

  res.status(200).json(data)
}


module.exports = {
  getDatas,
  createData,
  deleteData,
}