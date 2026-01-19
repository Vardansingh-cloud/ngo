const asyncHandler = require('express-async-handler');
const Donation = require('../models/Donation');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private (Donor)
const createDonation = asyncHandler(async (req, res) => {
    if (req.user.role === 'superadmin') {
        res.status(403);
        throw new Error('Superadmin cannot make donations');
    }

    const { amount, status } = req.body; // status is passed from frontend for sandbox simulation

    const donation = new Donation({
        donor: req.user._id,
        amount,
        status: status || 'success',
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
});

// @desc    Get all donations (for Admin/Superadmin)
// @route   GET /api/donations
// @access  Private (Admin/Superadmin)
const getDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find({}).populate('donor', 'name email').sort({ createdAt: -1 });
    res.json(donations);
});

// @desc    Download donations CSV
// @route   GET /api/donations/export
// @access  Private (Admin/Superadmin)
const exportDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find({}).populate('donor', 'name email').sort({ createdAt: -1 });

    let csv = 'Name,Email,Amount,Date,Status\n';
    donations.forEach(d => {
        const name = d.donor ? d.donor.name : 'Unknown';
        const email = d.donor ? d.donor.email : 'Unknown';
        const date = new Date(d.createdAt).toLocaleDateString();
        csv += `${name},${email},${d.amount},${date},${d.status}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('donations.csv');
    res.send(csv);
});

// @desc    Get donation stats for charts
// @route   GET /api/donations/stats
// @access  Private (Admin/Superadmin)
const getDonationStats = asyncHandler(async (req, res) => {
    // Aggregate total amount per day (simplified)
    const stats = await Donation.aggregate([
        {
            $match: { status: 'success' }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    res.json(stats);
});

// @desc    Get My Donations
// @route   GET /api/donations/my
// @access  Private (Donor)
const getMyDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
});

module.exports = { createDonation, getDonations, getDonationStats, getMyDonations, exportDonations };
