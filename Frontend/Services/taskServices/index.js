import Api from '../../globalVariable/variable'

export const createTask = async ( name, date,userId) => {
    const link = Api + "/" + "task"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
        body: JSON.stringify({
            "userId":userId,
            "name": name,
            "date": date,
        }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return true
    }
    else {
        return false
    }
};

export const getTasks = async () => {
    const link = Api + "/" + "tasks"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`

        },
        
    });
    const tasks = await response.json();
    console.log(tasks)
    if (response.status == "200") {
        return tasks
    }
    else {
        return false
    }
};


export const deleteTask = async (taskId) => {
    const link = Api + "/task/" + taskId;
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`

        },
        
    });
    const tasks = await response.json();
    console.log(tasks)
    if (response.status == "200") {
        return tasks
    }
    else {
        return false
    }
};

export const getAllUsers = (req, res) => {
    if (req.user) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json({ error: 'Unable to retrieve users' }));
    }
    else {
        res.status(400).json('unAutherized')
    }
}
