var express = require('express');

var taskRoutes = require('./routes/task');
//Import the mongoose module
var mongoose = require('mongoose');
var app = express();

//Set up default mongoose connection
mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.fxvpy.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/',express.static('public'));
app.use('/api',taskRoutes);

app.listen(5000,'localhost',()=>{
    console.log("you are conected now to our server on port 5000");
});