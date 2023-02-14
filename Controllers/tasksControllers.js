const { Task } = require('../db/Models/taskModel')
const { User } = require('../db/Models/usersModel')

const Create = async (req, res) => {
    let name = req.body.name;
    let newTask = new Task({
        userId: req.body.userId,
        name
    });
    newTask.save().then((task) => {
        res.send(task)
    })
}
//index=read

const Index = async (req, res) => {
    Task.find({
        userId: req._userId,
    }).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.send(e)
    })

}
const Update = async (req, res) => {

    Task.findByIdAndUpdate({ id: req.params.id, userId: req._userId },
        {
            $set: req.body
        }).then(() => {
            res.send({ 'message': 'updated successfully' });
        });
}

const Delete = async (req, res) => {
    Task.findByIdAndRemove({
        id: req.params.id,
        userId: req.body._userId

    }).then((removedTask) => {
        res.send(removedTask);
    })

}

module.exports = {
    Create, Delete, Index, Update
}