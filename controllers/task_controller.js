var task = require('../models/taskShema');

function getTasksList(req,res){
    task.find((err,docs)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(docs));
    });
}

function addTask(req,res){
    task({...req.body,created_at:Date.now()}).save((err,lastTask)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(lastTask));
    });
}

function deleteTask(req,res){
    task.deleteOne({_id:req.body.task_id}).then(response=>{
        if(response.ok){
            res.writeHead(200,{
                'Content-Type':'application/json'
            }).end(JSON.stringify({id:req.body.task_id}));
        }
    });
}

module.exports={
    getTasksList:getTasksList,
    addTask:addTask,
    deleteTask:deleteTask
}