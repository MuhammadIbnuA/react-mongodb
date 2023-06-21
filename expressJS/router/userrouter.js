const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Register a new user
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

// Get all users
router.get('/users', userController.getUsers);

// Get logged in users
router.get('/loggedinusers', userController.getLoggedInUsers);

module.exports = router;
