const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const formModel = require('./db/formModel');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const morgan = require('morgan');
const favicon = require('favicon');
const mongoose = require('mongoose');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  key:'cdcForm.sid',
  resave:true,
  saveUninitialized:false,
  secret:'this_is_bad_practice',
  store: new mongoStore({url:'mongodb://sessions:1234@ds129004.mlab.com:29004/cdc_form',
  autoReconnect:true,
  ttl:1000 * 60 * 60 * 24 * 2
})
}));
app.use(flash());

mongoose.connect('mongodb://root:1234@ds129004.mlab.com:29004/cdc_form');
mongoose.connection
  .once('open',()=>{console.log('connected to database')})
  .on('error',(err)=>{console.log('error',err)})
  .on('disconnected',()=>{console.log('disconnected from database')});

  mongoose.Promise = global.Promise;

 // POST API >>> submit a user

app.post('/submit',(req,res,next)=>{
   let { name, sex, q1, q2, q3 } = req.body;
   let userData = formModel({name, sex, ans1:q1, ans2:q2, ans3:q3 });
   userData.save()
       .then(user =>{
           if(!user) return Promise.reject();
           res.status(200).send(user);
       })
       .catch(err => console.error(err))
})

// POST API >>> get all users

app.get('/users',(req,res,next)=>{
    formModel.find({}).then(users =>{
       if(!users) return Promise.reject();
       res.status(200).send(users); 
    }).catch(err => console.error(err));
});

// PATCH API >> update user data

app.patch('/user/:_id',(req,res,next)=>{
     const {_id} = req.params;
    formModel.findById(_id)
          .then(user =>{
               if(!user) return Promise.reject();
                res.redirect('/');
                res.status(200).send(user);  
          })
          .catch(err => console.error(err));
});

app.get('/',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'some.html'));
});

app.listen(3000,(err)=>{
    err ? console.log(err) : console.log('app is running on 3000');
})