const express = require('express')

const NotifiController = require('../controllers/NotifController')
const requireAuth = require('../middleware/requireAuth')

  const router = express.Router()
  
  // require auth for all Notifi routes
  router.use(requireAuth)
  
  // GET ALL NOtiFICATIONS FOR Students

  router.get('/',NotifiController.Notification_getallNotifis);
  

  // POST a new Notifications
  router.post('/create', NotifiController.Notification_create_post)
  
  // DELETE a Notifications
  router.delete('/:id', NotifiController.Notification_delete )

module.exports = router