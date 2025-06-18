const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');
const auth = require('../middlewares/auth.middleware');
router.use(auth);
router.post('/', async (req, res) => {
const book = new Book({ ...req.body, userId: req.user._id });
await book.save();
res.json(book);
});
router.get('/', async (req, res) => {
const books = await Book.find({ userId: req.user._id });
res.json(books);
});
module.exports = router;