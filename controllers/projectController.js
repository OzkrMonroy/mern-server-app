const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { projectName } = req.body;
  try {
    let project = await Project.findOne({ projectName });
    if (project) {
      return res
        .status(400)
        .json({ msg: "A project with that name is already exist" });
    }

    project = new Project(req.body);
    project.projectCreateBy = req.user.id;

    await project.save();

    res.json(project);
  } catch (error) {}
};

exports.fetchAllProjects = async (req, res) => {
  try {
    const projectsList = await Project.find({
      projectCreateBy: req.user.id,
    }).sort({ projectDate: -1 });
    return res.status(200).json({ projectsList });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {projectName} = req.body;
  const newProject = {}

  if(projectName){
    newProject.projectName = projectName;
  }

  try {
    let project = await Project.findById(req.params.id);

    if(!project) {
      return res.status(404).json({ msg: 'Project does not exist'});
    }

    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you do not have authorization'});
    }

    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject}, {new: true});
    res.json({project});

  } catch (error) {
   console.log(error);
   res.status(500).send('Server Error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if(!project) {
      return res.status(404).json({ msg: 'Project does not exist'});
    }

    if(project.projectCreateBy.toString() !== req.user.id){
      return res.status(404).json({ msg: 'you do not have authorization'});
    }
    await Project.findOneAndRemove({ _id: req.params.id});
    res.json({ msg: 'Project was delete'});

  } catch (error) {
    console.log(error);
    res.status(500).send('Sever Internal Error');
  }
}
