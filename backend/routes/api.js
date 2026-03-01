const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const ContactMessage = require('../models/ContactMessage');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
    res.json({ message: 'Valid token', user: req.user });
});

// Projects API
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/projects', authenticateToken, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/projects/:id', authenticateToken, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seeding Initial Data
router.post('/seed', async (req, res) => {
    try {
        // Create admin if none
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            const admin = new User({ username: 'admin', password: 'password123' });
            await admin.save();
        }

        // Create initial projects if empty
        const count = await Project.countDocuments();
        if (count === 0) {
            const defaultProjects = [
                {
                    title: 'SF Salaries Insights',
                    description: 'Exploratory Data Analysis on SF Salaries - visualizations and insights',
                    githubLink: 'https://github.com/NayanAdhikary/sf-salaries-insights',
                    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn']
                },
                {
                    title: 'SF City Employee Salaries Cleaning',
                    description: 'Data cleaning project on SF City Employee Salaries using Pandas',
                    githubLink: 'https://github.com/NayanAdhikary/sf-salaries-cleaning',
                    technologies: ['Python', 'Pandas', 'Data Cleaning']
                },
                {
                    title: 'ML Salary Predictor',
                    description: 'ML Salary Prediction - Random Forest (R²=0.82)',
                    githubLink: 'https://github.com/NayanAdhikary/sf-salary-predictor',
                    technologies: ['Python', 'Scikit-Learn', 'Machine Learning', 'Random Forest']
                },
                {
                    title: 'IPL Cricket Performance Analytics',
                    description: 'Data analysis project on IPL match data (2008-2025) using Python/Pandas. Computes player KPIs (strike rate, economy), visualizations for performance insights. Built for BCCI Performance Analyst portfolio.',
                    githubLink: 'https://github.com/NayanAdhikary/IPL-Cricket-Performance-Analytics',
                    technologies: ['Python', 'Pandas', 'Data Analysis', 'Sports Analytics', 'Visualizations']
                }
            ];
            await Project.insertMany(defaultProjects);
        }

        res.json({ message: 'Seed successful. Admin credentials: admin / password123' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const nodemailer = require('nodemailer');

// Contact Email Route
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide name, email, and message.' });
        }

        // Persist the contact message in MongoDB
        const contactDoc = new ContactMessage({ name, email, message });
        await contactDoc.save();

        // Configure Nodemailer Transporter (Ethereal)
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        const mailOptions = {
            from: email,
            to: 'joydevadhikary468@gmail.com',
            subject: `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Message from Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Respond with both preview URL and saved contact ID
        res.status(200).json({ message: 'Message sent successfully!', previewUrl: nodemailer.getTestMessageUrl(info), contactId: contactDoc._id });
    } catch (error) {
        console.error('Contact route error:', error);
        res.status(500).json({ message: 'Failed to process contact request.' });
    }
});

module.exports = router;
