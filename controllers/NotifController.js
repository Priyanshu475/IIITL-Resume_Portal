const Notification = require('../models/notifModel');


const Notification_getallNotifis = (req, res) => {
  Notification.find().sort({ createdAt: -1 })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
        });
}

const Notification_create_post = (req, res) => {
  const notification = new Notification(req.body);
  notification.save()
    .then(result => {
      res.json(result)
      console.log("Notification Added")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

const Notification_delete = (req, res) => {
  const id = req.params.id;
    Notification.findByIdAndDelete(id)
    .then(result => {
      res.json(result)
      console.log("Notification Deleted")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

module.exports = {
    Notification_getallNotifis, 
  Notification_create_post, 
  Notification_delete
}