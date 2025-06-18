const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
const user = new User(req.body);
await user.save();
res.json(user);
});
router.post('/login', async (req, res) => {
const user = await User.findOne({ username: req.body.username });
if (!user || !(await user.comparePassword(req.body.password))) {
return res.status(400).json({ message: "Invalid credentials" });
}
const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
res.json({ token });
});
module.exports = router;