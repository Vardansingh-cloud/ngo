const express = require('express');
const router = express.Router();
const { createDonation, getDonations, getDonationStats, getMyDonations, exportDonations } = require('../controllers/donationController');
const { protect, admin, superadmin } = require('../middleware/authMiddleware');

router.post('/', protect, createDonation);
router.get('/', protect, admin, getDonations);
router.get('/stats', protect, admin, getDonationStats);
router.get('/export', protect, admin, exportDonations);
router.get('/my', protect, getMyDonations);

module.exports = router;
