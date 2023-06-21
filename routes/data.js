const express = require('express')
const {
  createData,
  getDatas,
  deleteData,
  getallDatas
} = require('../controllers/dataController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all datas routes
router.use(requireAuth)

// GET all datas
router.get('/', getDatas)


// GET ALL THE DATAS FOR ADMIN
router.get('/admin', getallDatas)

// POST a new data
router.post('/', createData)

// DELETE a data
router.delete('/:id', deleteData)




module.exports = router