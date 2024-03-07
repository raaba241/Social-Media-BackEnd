const { Thought, User } = require('../models');


Module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
                .select('-__v')
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get single thought by id
    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id })
                .select('-__v')
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
}