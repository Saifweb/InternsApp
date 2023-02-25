//this file will hundle the connection between the mongodb and our backend project

const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
//now our Project is linked with this database ( internsApp)
mongoose.connect('mongodb+srv://internsApp:internsApp@cluster0.en2two4.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((err) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(err);
});
module.exports = {
    mongoose
};