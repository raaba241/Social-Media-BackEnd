const router = require('express').Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/userController.js');


// /api/users
router.route('/').get(getUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser); 

module.exports = router;