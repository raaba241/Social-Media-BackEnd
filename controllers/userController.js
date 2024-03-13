const { ObjectId } = require('mongodb');
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const userData = await User.find()
                .select('-__v')
                .populate('thoughts')
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get single user by id and populate thought and friend data

    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('thoughts')
            res.json(userData);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    },

    // Create a new user 

    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Update user by id

    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true, runValidators: true });

            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete user by id 

    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id });

            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            await Thought.deleteMany({ _id: { $in: userData.thoughts } });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}