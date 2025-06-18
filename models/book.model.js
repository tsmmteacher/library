const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
title: String,
author: String,
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Book', bookSchema);