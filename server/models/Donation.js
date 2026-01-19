const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        default: 'success',
    },
}, {
    timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
