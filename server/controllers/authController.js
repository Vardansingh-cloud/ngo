const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        if (!user.isApproved) {
            res.status(401);
            throw new Error('Account pending approval');
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Prevent direct Superadmin registration
    if (role === 'superadmin') {
        res.status(400);
        throw new Error('Cannot register as Superadmin');
    }

    // Let's allow registration of 'admin' but it will be isApproved: false.

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'donor',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get all pending admins
// @route   GET /api/auth/pending-admins
// @access  Private/Superadmin
const getPendingAdmins = asyncHandler(async (req, res) => {
    const users = await User.find({ role: 'admin', isApproved: false });
    res.json(users);
});

// @desc    Approve an admin
// @route   PUT /api/auth/approve/:id
// @access  Private/Superadmin
const approveAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isApproved = true;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Reject/Remove an admin
// @route   DELETE /api/auth/remove-admin/:id
// @access  Private/Superadmin
const rejectAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'Admin removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { authUser, registerUser, getPendingAdmins, approveAdmin, rejectAdmin };
