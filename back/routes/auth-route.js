const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authController = require('../controllers/auth-controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe); // corrected function name
router.get('/example', (req, res) => {
  // Your route handler logic here
});

module.exports = router;
