const { Thought, User } = require('../models');


module.exports = {
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
            // Firest We create the THOUGHT object
            const thoughtData = await Thought.create(req.body);

            // Next We ASSOCIATE the new THOUGHT object with our (current) USER
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },  // first find the user
                { $push: { thoughts: thoughtData._id } },  // we update the USERS (thoughts arraay) data
                { new: true }
            );
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            const userData = await User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );

            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'Thought and associated reactions deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}