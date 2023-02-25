require('dotenv').config()
const { User } = require('../db/Models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const { Task } = require('../db/Models/taskModel')


// Create a new user
const createUser = async (req, res) => {
    if (req.user.role == "admin") {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password || "123456", salt)
        const newUser = new User({
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: hashedPassword,
            block: req.body.block
        });
        newUser.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json({ error: err }));
    }
    else {
        res.status(400).json("UnAutherized")
    }

};
const getInterns = (req, res) => {
    if (req.user.role == "supervisor") {
        User.find({ supervisor_id: req.user.id })
            .then(users => res.json(users))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve users' }));
    }
    else {
        res.status(400).json('unAutherized')
    }
}
const getTaskNumbers = async (req, res) => {
    if (req.user.role === "intern") {
        try {
            const tasks = await Task.find({ userId: req.user.id });

            let totalTasks = 0;
            let completedTasks = 0;

            for (const task of tasks) {
                totalTasks++;
                if (task.completed === "100") {
                    completedTasks++;
                }
            }

            res.json({
                totalTasks,
                completedTasks
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Retrieve all users
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

// Retrieve a single user by userid
const getUserById = (req, res) => {
    if (req.user.role == "admin") {
        User.findOne({ id: req.params.userid })
            .then(user => res.json(user))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve user' }));
    }
    else {
        res.status(400).json('unAutherized')
    }
}

// Update a user by userid
const updateUser = (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
        if (user) {
            user.name = req.body.name,
                user.email = req.body.email,
                user.save()
                    .then(savedUser => res.status(200).json(savedUser))
                    .catch(err => res.status(400).json({ error: err }));
        }
        else {
            res.status(400).json('unAutherized')
        };
    }
    )
};
const superUpdateUser = (req, res) => {
    if (req.user.role == "admin") {
        User.findByIdAndUpdate(req.params.user_id, req.body).then(user => {
            if (user) {
                res.status(200).json("user Updated Succesfully")
            }
            else {
                console.log(user)
                res.status(400).json("user not found")
            }
        }
        );
    }
    else {
        res.status(400).json('unAutherized')
    }
};
const updatePassword = (req, res) => {
    User.findOne({ _id: req.user.id }).then(async user => {
        if (user) {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword,
                user.save().then(res.status(200).json(user)).catch(err => res.status(400).json({ error: err }));
        }
        else {
            res.status(400).json('unAutherized')
        };
    }
    )
}
const assignAsupervioserToIntern = (req, res) => {
    if (req.user.role == "admin") {
        User.findByIdAndUpdate(req.params.user_id, { supervisor_id: req.params.supervisor_id }).then(user => {
            if (user) {
                res.status(200).json("Assigned Superviosed Succesfully")
            }
            else {
                console.log(user)
                res.status(400).json("Error")
            }
        }
        );
    }
}
// Delete a user by userid
const deleteUser = (req, res) => {
    if (req.user.role == "admin") {
        User.findOneAndRemove({ id: req.params.user_id })
            .then(user => res.json({ success: true }))
            .catch(err => res.status(400).json({ error: 'Unable to delete user' }));
    }
    else {
        res.status(400).json('unAutherized')
    }
}

const ConnectedUser = (req, res) => {
    if (req.user) {
        User.findOne({ _id: req.user.id }).then(async user => {
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(401).json("user not found");
            }
        }
        )
    }
    else {
        res.status(400).json('unAutherized')
    }

}
module.exports = {
    createUser, getTaskNumbers, getAllUsers, getInterns, getUserById, updateUser, deleteUser, ConnectedUser, superUpdateUser, assignAsupervioserToIntern, updatePassword
}
