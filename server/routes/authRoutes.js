const express = require('express');
const router = express.Router();
const { authUser, registerUser, getPendingAdmins, approveAdmin, rejectAdmin } = require('../controllers/authController');
const { protect, superadmin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/pending-admins', protect, superadmin, getPendingAdmins);
router.put('/approve/:id', protect, superadmin, approveAdmin);
router.delete('/remove-admin/:id', protect, superadmin, rejectAdmin);

module.exports = router;
