const Notification = require('../models/notifModel');
const requireAuth = require('../middleware/requireAuth');

// Middleware to check user role
const checkAdminRole = (req, res, next) => {
    const user = req.user; // Now populated by requireAuth middleware
    if (user && user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ error: 'Access denied. Admins only.' });
    }
};

const Notification_getallNotifis = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Using the requireAuth and checkAdminRole middleware for creating notifications
const Notification_create_post = [requireAuth, checkAdminRole, async (req, res) => {
    const notification = new Notification(req.body);
    try {
        const result = await notification.save();
        res.json(result);
        console.log("Notification Added");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}];

// Using the requireAuth and checkAdminRole middleware for deleting notifications
const Notification_delete = [requireAuth, checkAdminRole, async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Notification.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json(result);
        console.log("Notification Deleted");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}];

module.exports = {
    Notification_getallNotifis,
    Notification_create_post,
    Notification_delete
};
