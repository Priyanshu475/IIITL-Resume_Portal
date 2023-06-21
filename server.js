require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const dataRoutes = require('./routes/data')
const userRoutes = require('./routes/user')
const notificationRoutes = require('./routes/notifications')
const PORT = 4000
const {MONGO_URI} =require('./config/keys')


// express app
const app = express() 

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/data', dataRoutes)
app.use('/api/user', userRoutes)
app.use('/api/notifications', notificationRoutes)

if(process.env.NODE_ENV == 'production'){
  const path = require('path')
  app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'client','build')))
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  }
)
}


// connect to db
mongoose.connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to db & listening on port',PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })