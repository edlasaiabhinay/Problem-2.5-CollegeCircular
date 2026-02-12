const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const CircularSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, enum: ['urgent', 'informational', 'action-required'], required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    scheduledAt: { type: Date },
    readBy: [{
        name: { type: String },
        readAt: { type: Date, default: Date.now }
    }],
    totalRecipients: { type: Number, default: 0 },
    attachments: [{
        name: { type: String },
        type: { type: String },
        size: { type: String }
    }],
    comments: [CommentSchema],
    tags: [String],
    version: { type: Number, default: 1 },
    template: { type: String }
});

module.exports = mongoose.model('Circular', CircularSchema);
