const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedSuperadmin = async () => {
    await connectDB();

    const superadminExists = await User.findOne({ email: 'superadmin@ngo.com' });

    if (superadminExists) {
        console.log('Superadmin already exists');
        process.exit();
    }

    await User.create({
        name: 'Super Admin',
        email: 'superadmin@ngo.com',
        password: 'superadmin123',
        role: 'superadmin',
        isApproved: true
    });

    console.log('Superadmin created');
    process.exit();
};

seedSuperadmin();
