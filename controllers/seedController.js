// import User from '../models/userModel.js';
// import Company from '../models/companyModel.js';
// import Event from '../models/eventModel.js';
// import mongoose from 'mongoose';


import User from '../models/userModel.js';
import Company from '../models/companyModel.js';
import Event from '../models/eventModel.js';

const seedDatabase = async (req, res) => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Event.deleteMany({});

        // Create sample users
        const user1 = await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password123', isAdmin: true });
        const user2 = await User.create({ name: 'Jane Smith', email: 'jane@example.com', password: 'password456' });
        const user3 = await User.create({ name: 'Alice Johnson', email: 'alice@example.com', password: 'password789' });
        const user4 = await User.create({ name: 'Bob Williams', email: 'bob@example.com', password: 'password101' });
        const user5 = await User.create({ name: 'Eve Brown', email: 'eve@example.com', password: 'password202' });
        const user6 = await User.create({ name: 'David Lee', email: 'david@example.com', password: 'password303' });

        // Create sample companies
        const company1 = await Company.create({ name: 'TechCorp', description: 'A tech company' });
        const company2 = await Company.create({ name: 'Innovate Inc', description: 'An innovative company' });
        const company3 = await Company.create({ name: 'Global Solutions', description: 'A global solutions company' });
        const company4 = await Company.create({ name: 'Creative Minds', description: 'A creative agency' });
        const company5 = await Company.create({ name: 'FutureTech', description: 'A future technology company' });
        const company6 = await Company.create({ name: 'Pioneer Group', description: 'A pioneer group company' });

        // Create sample events
        const event1 = await Event.create({ title: 'Tech Conference', description: 'A conference about technology', date: new Date(), location: 'New York', organizer: user1._id, company: company1._id });
        const event2 = await Event.create({ title: 'Innovation Summit', description: 'A summit about innovation', date: new Date(), location: 'San Francisco', organizer: user2._id, company: company2._id });
        const event3 = await Event.create({ title: 'Global Meetup', description: 'A meetup for global solutions', date: new Date(), location: 'London', organizer: user3._id, company: company3._id });
        const event4 = await Event.create({ title: 'Creative Workshop', description: 'A workshop for creative minds', date: new Date(), location: 'Paris', organizer: user4._id, company: company4._id });
        const event5 = await Event.create({ title: 'FutureTech Expo', description: 'An expo for future technology', date: new Date(), location: 'Tokyo', organizer: user5._id, company: company5._id });
        const event6 = await Event.create({ title: 'Pioneer Gathering', description: 'A gathering for pioneer group', date: new Date(), location: 'Berlin', organizer: user6._id, company: company6._id });

        res.status(201).json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
};

export { seedDatabase };