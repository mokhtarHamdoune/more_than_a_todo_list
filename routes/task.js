var express = require('express');
var router = express.Router();
var task = require('../models/taskShema');
// body-parser middleware
var bodyPaser = express.json();

router.get('/tasks',(req,res)=>{
    task.find((err,docs)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(docs));
    });
    
});

router.post('/tasks',bodyPaser, (req,res)=>{
    task({...req.body,created_at:Date.now()}).save((err,lastTask)=>{
        if(err) throw new Error(err); 
        res.writeHead(200,{
            'Content-Type':'application/json'
        }).end(JSON.stringify(lastTask));
    });

});

router.delete('/tasks',bodyPaser,(req,res)=>{
    
    task.deleteOne({_id:req.body.task_id}).then(response=>{
        if(response.ok){
            res.writeHead(200,{
                'Content-Type':'application/json'
            }).end(JSON.stringify({id:req.body.task_id}));
        }
    })
});

module.exports = router;