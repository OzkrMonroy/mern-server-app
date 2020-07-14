const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { taskProject } = req.body

  try {
    const project = await Project.findById(taskProject);

    if(!project){
      return res.status(404).json({ msg: 'This project doesn\'t exist'});
    }
    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you don\'t have authorization'});
    }

    const task = new Task(req.body);
    await task.save();

    return res.json({ task });

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

exports.fetchAllTasks = async (req, res) => {
  try {
    const { taskProject } = req.query

    const project = await Project.findById(taskProject);

    if(!project){
      return res.status(404).json({ msg: 'This project doesn\'t exist'});
    }
    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you don\'t have authorization'});
    }

    const tasks = await Task.find({ taskProject }).sort({taskDate: -1});
    res.json({ tasks })
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { taskProject, taskName, taskState } = req.body

    let task = await Task.findById(req.params.id);

    if(!task){
      return res.status(404).json({ msg: 'The task doesn\'t exist '});
    }
    
    const project = await Project.findById(taskProject);

    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you don\'t have authorization'});
    }

    const newTask = {};
    if(taskName){
      newTask.taskName = taskName;
    }
    if(taskState || !taskState){
      newTask.taskState = taskState;
    }

    task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, { new: true});
    res.json({ task });
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { taskProject } = req.query

    let task = await Task.findById(req.params.id);

    if(!task){
      return res.status(404).json({ msg: 'The task doesn\'t exist '});
    }
    
    const project = await Project.findById(taskProject);

    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you don\'t have authorization'});
    }

    await Task.findOneAndRemove({_id: req.params.id});
    res.json({ msg: 'Task has been deleted'});
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}