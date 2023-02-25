const express = require("express");
const cors = require('cors');

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
app.use('/uploads', express.static('uploads'))
//const mongoose = require("mongoose")

//importation mongoose(to relie server with mongoDb)
const { mongoose } = require('./db/mongoose');

app.listen(3000, () => {
    console.log("serveur is listenning on port 3000")
});

const userRoutes = require('./Routes/usersRoute');
const cvRoutes = require('./Routes/cvsRoutes');
const taskRoutes = require('./Routes/tasksRoute');
const authRoutes = require('./Routes/authRoute');
const meetingRoutes = require('./Routes/meetingRoute');


app.use('/api', userRoutes.routes);
app.use('/api', cvRoutes.routes);
app.use('/api', taskRoutes.routes);
app.use('/api', authRoutes.routes);
app.use('/api', meetingRoutes.routes);




