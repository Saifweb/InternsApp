const { Resume } = require('../db/Models/cvsModel')

const create = async (req, res) => {
  try {
    const resume = new Resume({
      email: req.body.email,
      position: req.body.position,
      resume: ""
    });
    if (req.file) {
      resume.resume = req.file.path
    }
    await resume.save();
    res.status(200).json({ message: 'Resume created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating resume' });
  }
};
// you need to be an admin to do this functions
const readAll = async (req, res) => {
  console.log(req.user.role == "supervisor")
  if (req.user.role == 'admin' || req.user.role == 'employee' || req.user.role == "supervisor") {
    try {
      const resumes = await Resume.find();
      res.status(200).json(resumes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error getting resumes' });
    }
  }
  else {
    console.log(req.user.role)
    res.status(400).json({ error: 'unAthorized' });

  }
};
const readOne = async (req, res) => {
  if (req.user.role == 'admin') {

    try {
      const resume = await Resume.findById(req.params.resume_id);
      res.status(200).json(resume);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error getting resume' });
    }
  }
  else {
    res.status(400).json('unAutherized')
  }
};

const update = async (req, res) => {
  if (req.user.role == "admin") {
    try {
      await Resume.findByIdAndUpdate(req.params.resume_id, req.body);
      res.status(200).json({ message: 'Resume updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating resume' });
    }
  }
  else {
    res.status(400).json({ error: 'Aunthorized' });

  }

};

const Delete = async (req, res) => {
  if (req.user.role == 'admin') {
    try {
      await Resume.findByIdAndDelete(req.params.resume_id);
      res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting resume' });
    }
  }
  else {
    res.status(400).json('unAutherized')
  }
}
module.exports = {
  create, readAll, readOne, update, Delete
}