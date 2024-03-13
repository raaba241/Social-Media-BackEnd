const router = require('express').Router();

const { getThoughts, getThoughtById, createThought, updateThought, deleteThought,} = require('../../controllers/thoughtController.js');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThoughtById).delete(deleteThought);

module.exports = router;