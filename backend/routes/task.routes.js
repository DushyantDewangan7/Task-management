// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Task } = require('../models/task.model');
const { getDatabase } = require('../database/db');
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
    try {
        const { title, description, status, dueDate, priority, assignedTo, role } = req.body;
        if(!title && !description ){
            return res.status(400).json({ message: 'Title and Description are required' });
        }
        const db = getDatabase();
        const newTask = new Task({ title, description, status, dueDate, priority, assignedTo, role });
        console.log("this is new task-->",newTask);
        await db.collection('tasks').insertOne(newTask);
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const db = getDatabase();
        const tasks = await db.collection('tasks').find().toArray();
        console.log("these are tasks-->",tasks);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDatabase();
        const task = await db.collection('tasks').findOne({ _id: new mongoose.Types.ObjectId(id) });
        console.log("this is task with id -->",task);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }   
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate, priority, assignedTo, role } = req.body;
        const db = getDatabase();
        const updatedTask = await db.collection('tasks').findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: { title, description, status, dueDate, priority, assignedTo, role } },
            { returnDocument: 'after' }
        );
        console.log("this is updated task-->",updatedTask);
        if (!updatedTask.value) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask.value });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDatabase();
        const deletedTask = await db.collection('tasks').findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
        if (!deletedTask.value) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;

