const mongoose = require('mongoose');
const router = require('express').Router();
const { User } = require('../models/user.model');
const { getDatabase } = require('../database/db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = getDatabase();
        const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, email, password : hashedPassword });
        await db.collection('users').insertOne(newUser);
        console.log("this is new user-->",newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = getDatabase();
        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
       const match =  bcrypt.compareSync(password, user.password);
       if (!match) {
           return res.status(400).json({ message: 'Invalid username or password' });
       }
        console.log("this is user-->",user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', userId: user._id });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;