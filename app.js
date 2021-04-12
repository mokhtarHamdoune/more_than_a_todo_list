var express = require('express');
var task = require('./models/taskShema');
//Import the mongoose module
var mongoose = require('mongoose');
var app = express();
// body-parser middleware
var bodyPaser = express.json();
app.use(express.static('public'));
//Set up default mongoose connection
mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.fxvpy.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api/tasks',(req,res)=>{
    task.find((err,docs)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(docs));
    });
    
});


app.post('/api/tasks',bodyPaser, (req,res)=>{
    task({...req.body,created_at:Date.now()}).save((err,lastTask)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(lastTask));
    });

});


app.delete('/api/tasks',bodyPaser,(req,res)=>{
    
    task.deleteOne({_id:req.body.task_id}).then(response=>{
        if(response.ok){
            res.writeHead(200,{
                'Content-Type':'application/json'
            }).end(JSON.stringify({id:req.body.task_id}));
        }
    })
});



app.listen(5000,'localhost',()=>{
    console.log("you are conected now to our server on port 5000");
});