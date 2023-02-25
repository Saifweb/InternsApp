const { Task } = require('../db/Models/taskModel')
const { User } = require('../db/Models/usersModel')

const Create = async (req, res) => {
    if (req.user.role == "supervisor") {
        let newTask = new Task({
            userId: req.body.userId,
            name: req.body.name,
            date: req.body.date,
            completed: req.body.completed || "0%"
        });
        newTask.save().then((task) => {
            res.send(task)
        })
    }
    else {
        res.status(400).json('unAutherized')
    }
}
//index=read
const Index = async (req, res) => {
    if (req.user.role == "intern") {
        Task.find({
            userId: req.user.id,
        }).then((tasks) => {
            res.send(tasks);
        }).catch((e) => {
            res.send(e)
        })
    }
    else if (req.user.role == "admin") {
        Task.find().then((tasks) => {
            res.send(tasks);
        }).catch((e) => {
            res.send(e)
        })
    }
    else if (req.user.role == "supervisor") {
        await User.find({ supervisor_id: req.user.id }).then(async (users) => {
            let SupTask = [];
            const promises = users.map(async (user) => {
                try {
                    const tasks = await Task.find({ userId: user.id });
                    SupTask = SupTask.concat(tasks);
                } catch (e) {
                    console.log(e);
                }
            });
            await Promise.all(promises);
            console.log(SupTask);
            res.status(200).json(SupTask);
        }).catch((e) => {
            console.log(e);
        });
    }
}
const Update = async (req, res) => {

    if (req.user.role == "supervisor") {
        Task.findByIdAndUpdate(req.params.id, req.body).then((task) => {
            res.status(200).json(task);
        });
    }
    else if (req.user.role == "intern") {
        Task.findOne({ _id: req.params.id, userId: req.user.id }).then(task => {
            task.completed = req.body.completed;
            task.save().then(savedTask => {
                res.status(200).json(savedTask);
            }).catch(err => res.status(400).json({ error: err }));
        });
    }

    else {
        res.status(400).json('unAutherized')
    }

}

const Delete = async (req, res) => {
    if (req.user.role == "supervisor") {
        Task.findByIdAndRemove(req.params.id).then((removedTask) => {
            res.status(200).json(removedTask);
        })
    }
    else {
        res.status(400).json('unAutherized')
    }
}

const getAllUsers = (req, res) => {
    if (req.user) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve users' }));
    }
    else {
        res.status(400).json('unAutherized')
    }
}



module.exports = {
    Create, Delete, Index, Update,getAllUsers
}