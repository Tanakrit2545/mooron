const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

module.exports.register = async (req, res, next) => {
    const { username, password, email, first_name, last_name, address, phone } = req.body;
    try {
        // Validation
        if (!(username && password && email && first_name && last_name && address && phone)) {
            return next(new Error('Please fill in all inputs'));
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        
        const data = {
            username,
            password: hashedPassword,
            email,
            first_name,
            last_name,
            address,
            phone
        };

        const newUser = await db.user.create({ data });
        console.log(newUser);

        res.json({ msg: 'Registration successful' });
    } catch (err) {
        next(err); // Forward error to error handling middleware
    }
};

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Validation
        if (!(username.trim() && password.trim())) {
            throw new Error('Username or password must not be blank');
        }

        // Find user in db.user
        const user = await db.user.findFirst({ where: { username } });

        if (!user) {
            throw new Error('Invalid login');
        }

        // Check password
        const pwOk = await bcrypt.compare(password, user.password);
        if (!pwOk) {
            throw new Error('Invalid login');
        }

        // Issue JWT token 
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        
        res.json({ token });
    } catch (err) {
        next(err); // Forward error to error handling middleware
    }
};

exports.getMe = (req, res, next) => {
    res.json(req.user); // Assuming req.user is set by authentication middleware
};
