const Data = require('../models/dataModel')
const mongoose = require('mongoose')

// get all datas
const getDatas = async (req, res) => {
  const user_id = req.user._id

  const datas = await Data.find({user_id}).sort({createdAt: -1})

  res.status(200).json(datas)
}


// create new data
const createData = async (req, res) => {
  const {Rollno, BatchYear, Branch,ResumeLink} = req.body

  let emptyFields = []

  if(!Rollno) {
    emptyFields.push('Rollno')
  }
  if(!BatchYear) {
    emptyFields.push('BatchYear')
  }
  if(!Branch) {
    emptyFields.push('Branch')
  }
  if(!ResumeLink) {
    emptyFields.push('ResumeLink')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const data = await Data.create({Rollno, BatchYear, Branch, ResumeLink,user_id})
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


const getallDatas = async (req, res) => {
    try {
      const datas = await Data.find().populate('user_id');
  
      res.status(200).json(datas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch datas from the database' });
    }
  };


module.exports = {
  getDatas,
  createData,
  deleteData,
  getallDatas
}