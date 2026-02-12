const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Circular = require('../models/Circular');

// @route   GET /api/circulars
// @desc    Get all circulars
router.get('/', async (req, res) => {
    try {
        const circulars = await Circular.find().sort({ publishedAt: -1 });
        res.json(circulars);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/circulars
// @desc    Create a circular (Admin only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admi only.' });
    }

    try {
        const newCircular = new Circular(req.body);
        const circular = await newCircular.save();
        res.json(circular);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/circulars/:id
// @desc    Get circular by ID
router.get('/:id', async (req, res) => {
    try {
        const circular = await Circular.findById(req.params.id);
        if (!circular) return res.status(404).json({ message: 'Circular not found' });
        res.json(circular);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/circulars/:id/comments
// @desc    Add a comment
router.post('/:id/comments', auth, async (req, res) => {
    try {
        const circular = await Circular.findById(req.params.id);
        if (!circular) return res.status(404).json({ message: 'Circular not found' });

        const newComment = {
            author: req.body.author,
            role: req.user.role,
            content: req.body.content
        };

        circular.comments.push(newComment);
        await circular.save();
        res.json(circular.comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
