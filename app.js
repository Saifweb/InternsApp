const express = require("express")

const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.json());

//const mongoose = require("mongoose")

//importation mongoose(to relie server with mongoDb)
const { mongoose } = require('./db/mongoose');

app.listen(3000, () => {
    console.log("serveur is listenning on port 3000")
})

const userRoutes = require('./Routes/usersRoute');
const cvRoutes = require('./Routes/cvsRoutes');
const internRoutes = require('./Routes/internsRoute');
const taskRoutes = require('./Routes/tasksRoute');
app.use('/api', userRoutes.routes);
app.use('/api', cvRoutes.routes);
app.use('/api', internRoutes.routes);
app.use('/api', taskRoutes.routes);


