const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    task.save().then(() => {
        res.status(201).send(task);
    }).catch(e => {
        res.status(400).send(e);
    })
})

router.get('/tasks', auth, async (req, res) => {
    try {
        // M1
        // const tasks = await Task.find({ owner: req.user._id });

        // M2
        await req.user.populate('tasks');
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            return task[update] = req.body[update]
        });

        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;