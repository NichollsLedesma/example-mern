const routes = require('express').Router();
const Task = require('./../models/task.model');

routes.get('/', async (req, res) => {
    let tasks = await Task.find();
    res.json(tasks);
});
routes.get('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    res.json(task);
});
routes.post('/', async (req, res) => {
    let { title, description } = req.body;
    let taskNew = new Task({ title, description });
    await taskNew.save();
    res.json({
        status: 'Tarea guardada'
    });
});
routes.put('/:id', async (req,res)=>{
    let { title, description } = req.body;
    let taskNew = { title, description };
    await Task.findByIdAndUpdate(req.params.id, taskNew);
    res.json({
        status: 'Tarea actualizada'
    });
});
routes.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Tarea eliminada'
    });
});

module.exports = routes;