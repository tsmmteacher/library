require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
mongoose.connect(process.env.MONGO_URI).then((()=>console.log("Mongo DB connected"))).catch(err=>console.error("MongoDB connection error",err));
// Sécurité
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use("/api/users", require('./routes/user.routes'));
app.use("/api/books", require('./routes/book.routes'));
module.exports = app;