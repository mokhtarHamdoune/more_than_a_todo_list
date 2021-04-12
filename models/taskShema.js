var mongoose = require('mongoose');
const taskShema = new mongoose.Schema({
    task:String,
    date:String,
    time:String,
    created_at:Date
});

const task = mongoose.model('task',taskShema);

module.exports=task;