const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    detailDescription: { type: String },
    githubLink: { type: String, required: true },
    technologies: { type: [String] },
    liveLink: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
