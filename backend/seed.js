const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Circular = require('./models/Circular');
const User = require('./models/User');

dotenv.config();

const users = [
    {
        name: 'Dr. Rajesh Kumar',
        email: 'admin@campus.edu',
        password: 'admin123',
        role: 'admin',
        department: 'Administration'
    },
    {
        name: 'Priya Sharma',
        email: 'student@campus.edu',
        password: 'student123',
        role: 'student',
        department: 'CSE',
        year: '3rd'
    }
];

const circulars = [
    {
        title: "End Semester Examination Schedule – December 2025",
        content: "All students are hereby informed that the end semester examinations for the academic year 2025-26 will commence from December 15, 2025. Students must collect their hall tickets from the examination cell by December 10. Those with pending fees will not be issued hall tickets. Ensure all library books are returned before the exam period.",
        priority: "urgent", department: "All", year: "All", author: "Dr. Rajesh Kumar",
        publishedAt: "2025-11-20T09:00:00Z",
        readBy: [{ name: "Priya Sharma", readAt: "2025-11-20T10:30:00Z" }, { name: "Rahul Verma", readAt: "2025-11-20T11:00:00Z" }],
        totalRecipients: 450, attachments: [{ name: "Exam_Schedule.pdf", type: "pdf", size: "2.4 MB" }],
        comments: [{ author: "Priya Sharma", role: "student", content: "Will the practical exams be before or after theory?", timestamp: "2025-11-20T12:00:00Z" }],
        tags: ["examination", "schedule"], version: 2, template: "Exam Notice"
    },
    {
        title: "Annual Tech Fest 'InnoVate 2025' Registration Open",
        content: "We are excited to announce that registration for InnoVate 2025 is now open! The fest will feature coding competitions, hackathons, robotics challenges, and guest lectures from industry leaders. Early bird registration closes on November 30.",
        priority: "informational", department: "CSE", year: "All", author: "Prof. Anita Desai",
        publishedAt: "2025-11-18T14:00:00Z",
        readBy: [{ name: "Amit Patel", readAt: "2025-11-18T15:00:00Z" }, { name: "Sneha Iyer", readAt: "2025-11-18T16:30:00Z" }, { name: "Vikram Singh", readAt: "2025-11-19T09:00:00Z" }],
        totalRecipients: 200, attachments: [{ name: "InnoVate_Brochure.pdf", type: "pdf", size: "5.1 MB" }, { name: "Registration_Form.pdf", type: "pdf", size: "1.2 MB" }],
        comments: [], tags: ["techfest", "event", "registration"], version: 1
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await User.deleteMany({});
        await Circular.deleteMany({});

        await User.insertMany(users);
        console.log('Users seeded!');

        await Circular.insertMany(circulars);
        console.log('Circulars seeded!');

        console.log('Data seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedDB();
