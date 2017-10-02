const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./db/config');
const formModel = require('./db/formModel');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const morgan = require('morgan');

const {PORT,SESSION_STORE,DB_STORE,JWT_SECRET} = require('./configjs');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'index.html')));
app.use(session({
    key:'cdcForm.sid',
    store:new mongoStore({
        url:SESSION_STORE,
        autoReconnect:true,
        ttl:1000 * 60 * 60 * 24 * 2
    }),
    resave:true,
    saveUninitialized:false,
    secret:JWT_SECRET,
}));
app.use(flash);
app.use(morgan('dev'));
app.use(function(req,res,next){
    res.locals.user = {};
    next();
})

app.get('/users',(req,res,next)=>{
    formModel.find({})
        .then(users =>{
            if(!users) return Promise.reject();
            res.status(200).send(users);
        })
        .catch(err => res.status(404).send())
})

app.patch('/user/:_id',(req,res,next)=>{
    let {_id} = req.params;
    if(!id){
        req.flash('notFound','record does not exist');
        res.status(404).send(req.flash('notFound'));
    }else{
        formModel.findByIdAndUpdate({_id},{},{new:true})
            .then((user)=>{
                if(!user) return Promise.reject();
                res.status(200).send();
            })
            .catch(err => res.status(404).send())
    }
})

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

app.listen(PORT,(err)=>{
    (err) ? console.log(err) :{};
    console.log(`app is listening on port ${PORT}`);
})

