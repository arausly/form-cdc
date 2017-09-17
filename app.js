const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./db/config');
const formModel = require('./db/formModel');



var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'index.html')))


app.post('/submit',(req,res,next)=>{
    let { name, sex, q1, q2, q3 } = req.body; 
     let newData = new formModel({name,sex,ans1:q1,ans2:q2,an3:q3});
     newData.save().then((user)=>{
         res.redirect('/');
         res.status(200).send(user);
     });
});

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(8080,(err)=>{
    (err) ? console.log(err) :{};
    console.log('app is listening on port 8080');
})

